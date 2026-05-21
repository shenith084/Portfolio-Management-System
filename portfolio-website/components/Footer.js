export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-auto">
      <p className="text-sm">
        &copy; {year} MyPortfolio. Built with Next.js &amp; MongoDB.
      </p>
    </footer>
  );
}
