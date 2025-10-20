import { ApplicationForm } from "./components/ApplicationForm";
import { Benefits } from "./components/Benefits";
import { Hero } from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ApplicationForm />
      <Benefits />
      
      <footer className="bg-gray-900 text-[#9a9a9a] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img 
              src="/Res-Va-Blue-Logo.png" 
              alt="RES-VA Logo" 
              className="h-12 w-auto"
            />
          </div>
          <div className="text-center md:text-right">
            <p>&copy; 2025 RES-VA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
