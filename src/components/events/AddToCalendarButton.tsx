import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarPlus, ChevronDown, Check } from 'lucide-react';

interface AddToCalendarButtonProps {
    title: string;
    description?: string | null;
    location?: string | null;
    startDate: Date;
    endDate?: Date | null;
    allDay?: boolean;
    className?: string;
    iconClassName?: string;
    chevronClassName?: string;
}

const PRODID = '-//Penmaen and Nicholaston VH//EN';
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const formatDateOnly = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;

const formatUtcDateTime = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

const escapeICS = (text: string) =>
    text.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

function resolveRange(start: Date, end: Date | null | undefined, allDay: boolean) {
    if (allDay) {
        const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endDay = end
            ? new Date(end.getFullYear(), end.getMonth(), end.getDate())
            : startDay;
        // iCal/Google all-day end is exclusive — bump by one day
        const endExclusive = new Date(endDay.getTime() + DAY_MS);
        return { start: startDay, end: endExclusive };
    }
    return { start, end: end ?? new Date(start.getTime() + HOUR_MS) };
}

function buildICS(props: AddToCalendarButtonProps) {
    const allDay = !!props.allDay;
    const { start, end } = resolveRange(props.startDate, props.endDate, allDay);
    const uid = `${start.getTime()}-${Math.random().toString(36).slice(2, 10)}@penmaenandnicholastonvh.co.uk`;
    const dtStart = allDay
        ? `DTSTART;VALUE=DATE:${formatDateOnly(start)}`
        : `DTSTART:${formatUtcDateTime(start)}`;
    const dtEnd = allDay
        ? `DTEND;VALUE=DATE:${formatDateOnly(end)}`
        : `DTEND:${formatUtcDateTime(end)}`;

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        `PRODID:${PRODID}`,
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${formatUtcDateTime(new Date())}`,
        dtStart,
        dtEnd,
        `SUMMARY:${escapeICS(props.title)}`,
    ];
    if (props.description) lines.push(`DESCRIPTION:${escapeICS(props.description)}`);
    if (props.location) lines.push(`LOCATION:${escapeICS(props.location)}`);
    lines.push('END:VEVENT', 'END:VCALENDAR');
    return lines.join('\r\n');
}

function buildGoogleUrl(props: AddToCalendarButtonProps) {
    const allDay = !!props.allDay;
    const { start, end } = resolveRange(props.startDate, props.endDate, allDay);
    const dates = allDay
        ? `${formatDateOnly(start)}/${formatDateOnly(end)}`
        : `${formatUtcDateTime(start)}/${formatUtcDateTime(end)}`;
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: props.title,
        dates,
    });
    if (props.description) params.set('details', props.description);
    if (props.location) params.set('location', props.location);
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildOutlookUrl(props: AddToCalendarButtonProps) {
    const allDay = !!props.allDay;
    const { start, end } = resolveRange(props.startDate, props.endDate, allDay);
    const params = new URLSearchParams({
        path: '/calendar/action/compose',
        rru: 'addevent',
        subject: props.title,
        startdt: start.toISOString(),
        enddt: end.toISOString(),
    });
    if (allDay) params.set('allday', 'true');
    if (props.description) params.set('body', props.description);
    if (props.location) params.set('location', props.location);
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function downloadICS(props: AddToCalendarButtonProps) {
    const content = buildICS(props);
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const safeName = props.title.replace(/[^a-z0-9\-_]+/gi, '-').toLowerCase() || 'event';
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeName}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
}

export function AddToCalendarButton(props: AddToCalendarButtonProps) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
            setOpen(false);
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        const handleResize = () => setOpen(false);
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize, true);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize, true);
        };
    }, [open]);

    const toggle = () => {
        if (open) {
            setOpen(false);
            return;
        }
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
            const menuWidth = 224; // w-56
            const viewportPadding = 8;
            let left = rect.right - menuWidth;
            if (left < viewportPadding) left = rect.left;
            if (left + menuWidth > window.innerWidth - viewportPadding) {
                left = window.innerWidth - menuWidth - viewportPadding;
            }
            setMenuPos({ top: rect.bottom + 8, left });
        }
        setOpen(true);
    };

    const handleSelect = (action: 'google' | 'outlook' | 'ics') => {
        if (action === 'google') {
            window.open(buildGoogleUrl(props), '_blank', 'noopener,noreferrer');
        } else if (action === 'outlook') {
            window.open(buildOutlookUrl(props), '_blank', 'noopener,noreferrer');
        } else {
            downloadICS(props);
        }
        setOpen(false);
    };

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={toggle}
                aria-haspopup="menu"
                aria-expanded={open}
                className={
                    props.className ??
                    'cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-100 hover:bg-primary-100 transition-colors'
                }
            >
                <CalendarPlus className={props.iconClassName ?? 'w-3.5 h-3.5'} />
                Add to calendar
                <ChevronDown
                    className={`${props.chevronClassName ?? 'w-3 h-3'} transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && menuPos &&
                createPortal(
                    <div
                        ref={menuRef}
                        role="menu"
                        className="fixed z-[9999] w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 animate-in fade-in zoom-in-95 duration-150"
                        style={{ top: menuPos.top, left: menuPos.left }}
                    >
                        <button
                            role="menuitem"
                            onClick={() => handleSelect('google')}
                            className="cursor-pointer w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                            <Check className="w-3.5 h-3.5 text-primary-500 opacity-0" />
                            Google Calendar
                        </button>
                        <button
                            role="menuitem"
                            onClick={() => handleSelect('outlook')}
                            className="cursor-pointer w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                            <Check className="w-3.5 h-3.5 text-primary-500 opacity-0" />
                            Outlook.com
                        </button>
                        <button
                            role="menuitem"
                            onClick={() => handleSelect('ics')}
                            className="cursor-pointer w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                            <Check className="w-3.5 h-3.5 text-primary-500 opacity-0" />
                            Apple / iCal (.ics)
                        </button>
                    </div>,
                    document.body,
                )}
        </>
    );
}
