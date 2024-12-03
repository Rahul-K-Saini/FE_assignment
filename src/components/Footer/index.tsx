function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">Company Name</h3>
          <p className="text-gray-400 mt-2">Making the world better through technology</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-gray-400">contact@company.com</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;