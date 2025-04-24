import React from 'react';
import HeaderAbout from '../components/HeaderAbout';
import FooterAbout from '../components/FooterAbout';

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAbout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-gray-800">About</span> <span className="text-teal-600">Medbot</span>
          </h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Medbot is an innovative artificial intelligence-driven project that utilizes ReactJs and Tailwind CSS for the website's design. 
              To enhance the functionality and user experience, we have incorporated various npm packages. For the backend infrastructure, 
              we have implemented a Flask server.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              By inputting your essential personal information along with a Chest X-ray, our system can provide accurate health assessment results. 
              However, it is important to note that as an artificial intelligence platform, Medbot is intended to supplement professional medical advice, 
              and we strongly recommend consulting a healthcare professional for further treatment and guidance. For more detailed information, 
              please visit our dedicated GitHub repository.
            </p>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Collaborator</h3>
              <p className="flex items-center text-gray-700">
                Subhrojoyti Neogi (
                <a 
                  href="https://github.com/SaltyExorcist" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-800 ml-1"
                >
                  Link to Github Profile
                </a>
                )
              </p>
            </div>
          </div>
          
          <div className="text-center text-gray-600 italic">
            ~~~ Kalinga Institute of Industrial Technology<br />
            School of Computer Applications (2025)
          </div>
        </div>
      </main>
      
      <FooterAbout />
    </div>
  );
}

export default About;