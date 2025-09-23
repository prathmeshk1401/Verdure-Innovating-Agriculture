import React, { useState } from "react";
import styles from "./Tools.module.css";

export default function ToolsCalculators() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [diseaseImage, setDiseaseImage] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);

  const tools = [
    "Crop Yield Estimator",
    "Fertilizer Calculator",
    "Irrigation Calculator",
    "Pesticide Dosage Calculator",
    "Cost & Profit Estimator",
    "Weather Impact Tool",
    "Disease Detection"
  ];

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateResult = () => {
    switch (selectedTool) {
      case "Crop Yield Estimator":
        setResult(
          `Estimated yield for ${inputs.crop || "selected crop"} on ${inputs.area || "x"} acres is ~ ${Math.floor(Math.random() * 1000)} kg.`
        );
        break;
      case "Fertilizer Calculator":
        setResult(
          `Recommended fertilizer for ${inputs.crop || "crop"}: N-${Math.floor(Math.random() * 50)}kg, P-${Math.floor(Math.random() * 30)}kg, K-${Math.floor(Math.random() * 20)}kg.`
        );
        break;
      case "Irrigation Calculator":
        setResult(
          `For ${inputs.crop || "crop"}, irrigate ${Math.floor(Math.random() * 5) + 1} times per week with ${Math.floor(Math.random() * 20)} liters per acre.`
        );
        break;
      case "Pesticide Dosage Calculator":
        setResult(
          `Apply ${Math.floor(Math.random() * 10)} ml of pesticide per liter of water for ${inputs.crop || "crop"}.`
        );
        break;
      case "Cost & Profit Estimator":
        setResult(
          `Total cost: ₹${Math.floor(Math.random() * 50000)} | Expected Profit: ₹${Math.floor(Math.random() * 80000)}.`
        );
        break;
      case "Weather Impact Tool":
        setResult(
          `Upcoming weather may cause ${Math.random() > 0.5 ? "low" : "high"} risk of pests/disease for ${inputs.crop || "crop"}.`
        );
        break;
      default:
        setResult("Please select a valid tool.");
    }
  };

  const handleDiseaseImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDiseaseImage(URL.createObjectURL(file));
      setDiseaseResult("Analyzing...");
      setTimeout(() => {
        const mockResults = [
          "No visible disease detected.",
          "Early signs of leaf blight detected.",
          "Fungal infection suspected.",
          "Nutrient deficiency symptoms visible."
        ];
        setDiseaseResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      }, 2000);
    }
  };

  return (
    <div className={styles["toolsContainer"]}>
      <h1>Verdure Tools & Calculators</h1>
      <div>
        {tools.map((tool) => (
          <button
            key={tool}
            className={styles["toolButton"]}
            onClick={() => {
              setSelectedTool(tool);
              setResult(null);
              setDiseaseResult(null);
            }}
          >
            {tool}
          </button>
        ))}
      </div>

      {selectedTool && selectedTool !== "Disease Detection" && (
        <div className={styles["toolInputSection"]}>
          <h2>{selectedTool}</h2>
          <input
            type="text"
            name="crop"
            placeholder="Enter crop type"
            onChange={handleInputChange}
            className={styles["toolInput"]}
          />
          {selectedTool === "Crop Yield Estimator" && (
            <input
              type="number"
              name="area"
              placeholder="Enter area in acres"
              onChange={handleInputChange}
              className={styles["toolInput"]}
            />
          )}
          <button onClick={calculateResult} className={styles["calculateButton"]}>
            Calculate
          </button>
        </div>
      )}

      {selectedTool === "Disease Detection" && (
        <div className={styles["diseaseDetectionSection"]}>
          <h2>Disease Detection</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleDiseaseImageUpload}
            className={styles["fileInput"]}
          />
          {diseaseImage && (
            <div className={styles["diseaseImagePreview"]}>
              <img src={diseaseImage} alt="Uploaded Leaf" className={styles["diseaseImage"]} />
            </div>
          )}
          {diseaseResult && <p><strong>Result:</strong> {diseaseResult}</p>}
        </div>
      )}

      {result && (
        <div className={styles["resultSection"]}>
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
