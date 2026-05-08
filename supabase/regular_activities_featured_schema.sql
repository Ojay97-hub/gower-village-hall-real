ALTER TABLE public.regular_activities
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS regular_activities_single_featured
ON public.regular_activities (is_featured)
WHERE is_featured = true;

UPDATE public.regular_activities
SET
  is_featured = true,
  action_type = 'button',
  action_text = 'See more',
  action_link = '/hall/coffee-morning'
WHERE lower(title) LIKE '%coffee morning%';
