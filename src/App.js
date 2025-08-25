import React, { useState, useRef } from "react";

// Local fallback quotes
const localQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
];

function App() {
  // Quote widget state
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgAnalysis, setImgAnalysis] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);

  // Refs for scrolling
  const heroRef = useRef(null);
  const quoteRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const photoRef = useRef(null);

  // Local AI-like mock analysis
  const analyzeImg = () => {
    if (!uploadedImg) return;
    setImgLoading(true);
    setImgAnalysis(null);
    setTimeout(() => {
      // Generate a mock description based on filename and randomization
      const name = uploadedImg.name.toLowerCase();
      let description = "A photo.";
      if (name.includes("selfie")) description = "A selfie portrait.";
      else if (name.includes("dog")) description = "A cute dog.";
      else if (name.includes("cat")) description = "A playful cat.";
      else if (name.includes("landscape")) description = "A beautiful landscape.";
      else if (name.includes("food")) description = "A delicious meal.";
      else if (name.includes("car")) description = "A stylish car.";
      else if (name.includes("family")) description = "A family photo.";
      else description = "A unique image with interesting features.";
      // Suggestions and rating
      const suggestions = "Try improving lighting and focus for better results.";
      const rating = (Math.random() * 4 + 6).toFixed(1); // 6.0 - 10.0
      setImgAnalysis({
        description,
        suggestions,
        rating,
      });
      setImgLoading(false);
    }, 1200);
  };

  // Fetch a random quote from ZenQuotes API, fallback to local quotes
  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      if (!res.ok) throw new Error("Failed to fetch quote");
      const data = await res.json();
      // ZenQuotes returns an array with one object
      setQuote({ content: data[0].q, author: data[0].a });
    } catch (err) {
      // Fallback to a random local quote
      const fallback = localQuotes[Math.floor(Math.random() * localQuotes.length)];
      setQuote(fallback);
      // Do not set error message
    } finally {
      setLoading(false);
    }
  };

  // Scroll to a section
  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle image upload
  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImg(file);
      setImgPreview(URL.createObjectURL(file));
      setImgAnalysis(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => scrollTo(heroRef)}>MyUniqueApp</h1>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li className="hover:text-indigo-500 cursor-pointer" onClick={() => scrollTo(heroRef)}>Home</li>
          <li className="hover:text-indigo-500 cursor-pointer" onClick={() => scrollTo(featuresRef)}>Features</li>
          <li className="hover:text-indigo-500 cursor-pointer" onClick={() => scrollTo(aboutRef)}>About</li>
          <li className="hover:text-indigo-500 cursor-pointer" onClick={() => scrollTo(contactRef)}>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-indigo-600">Something Unique</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Build modern, creative, and stunning React apps with a touch of uniqueness. 
          Fast, clean, and responsive design for your next big idea.
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition" onClick={() => scrollTo(quoteRef)}>
          Get Started
        </button>
      </section>

      {/* Unique Quote Widget */}
      <section ref={quoteRef} className="flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-indigo-700">✨ AI Inspiration ✨</h3>
          {quote && (
            <div className="mb-4 animate-fade-in">
              <p className="text-lg text-gray-800 italic mb-2">"{quote.content}"</p>
              <p className="text-right text-indigo-500 font-semibold">- {quote.author}</p>
            </div>
          )}
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={fetchQuote}
            disabled={loading}
            className="px-5 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Fetching..." : quote ? "Get Another Quote" : "Get Inspired"}
          </button>
        </div>
      </section>

      {/* AI Photo Analyzer Section */}
      <section ref={photoRef} className="flex flex-col items-center justify-center py-8 bg-indigo-50">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-indigo-700">🖼️ AI Photo Analyzer</h3>
          <p className="text-xs text-gray-500 mb-2">(No API key required)</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImgUpload}
            className="mb-4"
          />
          {imgPreview && (
            <img src={imgPreview} alt="Preview" className="mb-4 rounded-lg max-h-60 object-contain border" />
          )}
          <button
            onClick={analyzeImg}
            disabled={!uploadedImg || imgLoading}
            className="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition disabled:opacity-50 mb-4"
          >
            {imgLoading ? "Analyzing..." : "Analyze Image"}
          </button>
          {imgAnalysis && (
            <div className="w-full mt-4 p-4 bg-indigo-100 rounded-lg text-left animate-fade-in">
              <p><span className="font-semibold">Description:</span> {imgAnalysis.description}</p>
              <p><span className="font-semibold">Suggestions:</span> {imgAnalysis.suggestions}</p>
              <p><span className="font-semibold">Rating:</span> <span className="font-bold text-indigo-700">{imgAnalysis.rating} / 10</span></p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Us?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="p-6 bg-indigo-50 rounded-2xl shadow hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-2 text-indigo-700">⚡ Fast</h4>
            <p className="text-gray-600">
              Super responsive design that adapts to all screen sizes.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl shadow hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-2 text-pink-600">🎨 Stylish</h4>
            <p className="text-gray-600">
              Modern UI with smooth gradients and clean layouts.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-2 text-green-600">🚀 Unique</h4>
            <p className="text-gray-600">
              Stand out with creative and unique front-end design.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 bg-indigo-50">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">About Us</h3>
        <div className="max-w-2xl mx-auto text-center text-gray-700">
          <p>
            MyUniqueApp is dedicated to building beautiful, modern, and unique web experiences. Our mission is to inspire creativity and deliver high-quality solutions for every project.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Contact</h3>
        <div className="max-w-2xl mx-auto text-center text-gray-700 space-y-4">
          <div>
            <span className="font-semibold">Phone: </span>
            <a href="tel:+917061215898" className="text-indigo-600 underline">+91 7061215898</a>
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            <a href="mailto:adarshrai410@gmail.com" className="text-indigo-600 underline">adarshrai410@gmail.com</a>
          </div>
          <div>
            <span className="font-semibold">Address: </span>
            Sasaram, Bihar
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} MyUniqueApp. Built with ❤️ by Adarsh.</p>
      </footer>
    </div>
  );
}

export default App;
