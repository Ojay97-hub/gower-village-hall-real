export function ForFamilies() {
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center">
      <div className="text-center px-4">
        {/* Animated dots */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span
            className="w-4 h-4 rounded-full bg-primary-500"
            style={{ animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0s' }}
          />
          <span
            className="w-4 h-4 rounded-full bg-primary-500"
            style={{ animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.2s' }}
          />
          <span
            className="w-4 h-4 rounded-full bg-primary-500"
            style={{ animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.4s' }}
          />
        </div>

        <h1 className="text-3xl md:text-4xl text-gray-800 mb-4">For Families</h1>
        <p className="text-gray-500 text-lg">This page is currently a work in progress. Check back soon!</p>

        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40% { transform: translateY(-16px); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
