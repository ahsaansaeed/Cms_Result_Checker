export function Footer() {
  return (
    <footer className="w-full border-t py-6 bg-muted/50">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Mirpur University of Science & Technology (MUST). All rights reserved.</p>
        <p className="mt-1">Built for students to easily access their CMS grade charts.</p>
      </div>
    </footer>
  );
}
