// Footer component
export function Footer() {
  return (
    <footer className="bg-[#F5F5F7] text-sm text-gray-600">
      <div className="flex flex-col items-center justify-between text-lg">
        <div className="flex flex-col lg:flex-row space-y-3 mx-auto space-x-4 px-4 py-12">
          <a href="#" className="hover:text-blue-600">
            About us
          </a>
          <a href="#" className="text-lg hover:text-blue-600">
            Privacy Policy
          </a>
          <a href="#" className="text-lg hover:text-blue-600">
            Terms of Service
          </a>
          <a href="#" className="text-lg hover:text-blue-600">
            Help Center
          </a>
        </div>
        <div className="w-full border border-[#DFDFDF]"></div>
        <div className="py-4">
          <p>© 2025 Echocart. All rights reserved hello@echocart.com</p>
        </div>
      </div>
    </footer>
  );
}
