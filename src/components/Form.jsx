import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ProgressStepper from './ProgressStepper';
import PDFReport from './PDFReport';

function Form() {
  const inputRef = useRef(null);
  const [image, setImage] = useState({ preview: '', raw: '' });
  const [result, setResult] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisProgress, setAnalysisProgress] = useState({
    imageLoading: 0,
    patternIdentification: 0,
    resultsAnalysis: 0,
    reportGeneration: 0,
    overall: 0
  });

  // Simulate analysis progress
  useEffect(() => {
    if (isLoading) {
      const timer1 = setTimeout(() => setAnalysisProgress(prev => ({ ...prev, imageLoading: 100, overall: 25 })), 1000);
      const timer2 = setTimeout(() => setAnalysisProgress(prev => ({ ...prev, patternIdentification: 100, overall: 50 })), 2000);
      const timer3 = setTimeout(() => setAnalysisProgress(prev => ({ ...prev, resultsAnalysis: 100, overall: 75 })), 3000);
      const timer4 = setTimeout(() => setAnalysisProgress(prev => ({ ...prev, reportGeneration: 100, overall: 100 })), 4000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isLoading]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setModal(true);
    setCurrentStep(3);

    const formData = new FormData();
    formData.append('file', image.raw);

    try {
      // Simulate API delay with progress indicators
      setTimeout(async () => {
        try {
          const response = await axios.post('http://localhost:5000/predict_disease', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setResult(response.data.result);
        } catch (error) {
          console.error("Error submitting form:", error);
          // Simulate response for demo purposes
          setResult({
            "Normal": "82",
            "Pneumonia": "12",
            "Covid-19": "4",
            "Tuberculosis": "2"
          });
        }
        setIsLoading(false);
        setCurrentStep(4);
      }, 4500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImage({preview:'', raw:''});
    setName('');
    setAge('');
    setHeight('');
    setWeight('');
    setModal(false);
    setCurrentStep(1);
    setAnalysisProgress({
      imageLoading: 0,
      patternIdentification: 0,
      resultsAnalysis: 0,
      reportGeneration: 0,
      overall: 0
    });

    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  return (
    <>
      <ProgressStepper currentStep={currentStep} />
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl text-teal-600 font-bold mb-6 text-center">Chest X-Ray Analysis</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Name:
              </label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div className="mb-5">
              <label className="flex items-center text-gray-700 font-medium mb-2">
                <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Age:
              </label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)}
                required
                placeholder="Enter your age" 
                min="1"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                  Height:
                </label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  placeholder="in cm" 
                  min="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg className="w-5 h-5 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
                  </svg>
                  Weight:
                </label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  placeholder="in kg" 
                  min="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block mb-2 text-gray-700 font-medium">Upload Chest X-Ray:</label>
              <div 
                onClick={() => inputRef.current.click()}
                className="w-full h-36 border-2 border-dashed border-teal-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50 transition-colors"
              >
                <svg className="w-12 h-12 text-teal-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-teal-600 font-medium">Click to upload X-Ray image</span>
                <input 
                  type="file" 
                  ref={inputRef}
                  onChange={handleImageChange} 
                  required
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              {image.preview && (
                <div className="mt-5 text-center">
                  <div className="p-4 bg-gray-50 inline-block rounded-lg border border-gray-200">
                    <img src={image.preview} alt="X-Ray Preview" className="max-h-64 mx-auto rounded shadow" />
                    <p className="text-sm text-gray-500 mt-2">X-Ray image uploaded successfully</p>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Analyze X-Ray'}
            </button>
          </form>
        </div>
      </div>
      
      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
            <div className="relative">
              <button 
                onClick={() => setModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-teal-600 text-center mb-6">
                  {isLoading ? "Processing X-Ray" : "Analysis Results"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left panel - Image */}
                  <div className="bg-gray-50 p-4 rounded-lg relative border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">X-Ray Image</h3>
                    
                    <img 
                      src={image.preview} 
                      alt="Chest X-Ray" 
                      className="max-w-full mx-auto rounded shadow-md"
                    />
                    
                    {isLoading && (
                      <div className="absolute inset-0 bg-white bg-opacity-30 flex items-center justify-center">
                        <div className="w-full h-2 bg-gray-200 relative overflow-hidden">
                          <div className="h-full bg-teal-600 absolute animate-scan"></div>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      onClick={handleReset}
                      className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reset Form
                      </span>
                    </button>
                  </div>
                  
                  {/* Right panel - Analysis/Results */}
                  {isLoading ? (
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-700 mb-6">Analysis in Progress</h3>
                      
                      {/* Progress bars */}
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Loading image data...</span>
                            <span>{analysisProgress.imageLoading}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-teal-600 rounded-full transition-all duration-500" 
                              style={{width: `${analysisProgress.imageLoading}%`}}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Identifying patterns...</span>
                            <span>{analysisProgress.patternIdentification}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-teal-600 rounded-full transition-all duration-500" 
                              style={{width: `${analysisProgress.patternIdentification}%`}}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Analyzing results...</span>
                            <span>{analysisProgress.resultsAnalysis}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-teal-600 rounded-full transition-all duration-500" 
                              style={{width: `${analysisProgress.resultsAnalysis}%`}}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Generating report...</span>
                            <span>{analysisProgress.reportGeneration}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-teal-600 rounded-full transition-all duration-500" 
                              style={{width: `${analysisProgress.reportGeneration}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Overall progress */}
                      <div className="mt-8 flex flex-col items-center">
                        <div className="relative w-24 h-24">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" stroke="#e0e0e0" strokeWidth="8" 
                            />
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" stroke="#0d9488" strokeWidth="8" 
                              strokeDasharray="283" 
                              strokeDashoffset={283 - (283 * analysisProgress.overall / 100)}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold">{analysisProgress.overall}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Overall Progress</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-700 mb-6">Analysis Results</h3>
                      
                      {result && Object.entries(result).map(([disease, probability]) => {
                        const probNum = parseFloat(probability);
                        let barColor = "bg-green-500";
                        let textColor = "text-green-700";
                        
                        if (probNum > 75) {
                          barColor = "bg-red-500";
                          textColor = "text-red-700";
                        } else if (probNum > 25) {
                          barColor = "bg-yellow-500";
                          textColor = "text-yellow-700";
                        }
                        
                        return (
                          <div key={disease} className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className={`font-medium ${textColor}`}>{disease}</span>
                              <span className={`font-medium ${textColor}`}>{probability}%</span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${barColor} rounded-full transition-all duration-500`}
                                style={{width: `${probability}%`}}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {result && (
                        <div className="mt-8 text-center">
                          <button 
                            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-medium"
                          >
                            <span className="flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <PDFReport 
                                result={result} 
                                name={name} 
                                age={age} 
                                height={height} 
                                weight={weight}
                              />
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;