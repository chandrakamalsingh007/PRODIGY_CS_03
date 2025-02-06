import React, { useState } from 'react'
import './App.css';

const getPasswordStrength = (password) => {
  let score = 0;
  let criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialCharacter: /[^A-Za-z0-9]/.test(password),
  };

  // Increment score for each valid criteria
  Object.values(criteria).forEach((criterion) => {
    if (criterion) score++;
  });

  // Determine suggestions based on criteria
  let suggestions = [];
  if (!criteria.length) suggestions.push("Use at least 8 characters.");
  if (!criteria.uppercase) suggestions.push("Include at least one uppercase letter.");
  if (!criteria.lowercase) suggestions.push("Include at least one lowercase letter.");
  if (!criteria.number) suggestions.push("Include at least one number.");
  if (!criteria.specialCharacter) suggestions.push("Include at least one special character (!@#$%^&* etc.).");

  // Return different strengths based on score
  if (score === 5) {
    return { strength: "Strong", color: "green", criteria, suggestions };
  } else if (score === 4) {
    return { strength: "Moderate", color: "yellow", criteria, suggestions };
  } else if (score === 3) {
    return { strength: "Weak", color: "orange", criteria, suggestions };
  } else {
    return { strength: "Very Weak", color: "red", criteria, suggestions };
  }
};


const App = () => {
  const [password, setPassword] = useState("");
  const [result,setResult] = useState(null);

  const handleCheckStrength = () => {
    setResult(getPasswordStrength(password));
  };

  return (
    <>
    <div className="container">
      <h2>Password Complexity Checker</h2>
      <input 
      type="password"
      placeholder='Enter your password ...'
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      className='password-input' 
      />
      <button onClick={handleCheckStrength} className="check-button">Check Strength</button>
      {result && (
        <>
          <div className="strength-bar" style={{ backgroundColor: result.color }}></div>
          <p className="strength-text">Strength: {result.strength}</p>
          <ul className="criteria-list">
            <li className={result.criteria.length ? "valid" : "invalid"}>✔ At least 8 characters</li>
            <li className={result.criteria.uppercase ? "valid" : "invalid"}>✔ Uppercase letter</li>
            <li className={result.criteria.lowercase ? "valid" : "invalid"}>✔ Lowercase letter</li>
            <li className={result.criteria.number ? "valid" : "invalid"}>✔ Number</li>
            <li className={result.criteria.specialCharacter ? "valid" : "invalid"}>✔ Special character</li>
          </ul>
          {result.suggestions.length > 0 && (
            <div className="suggestions">
              <h3>Suggestions:</h3>
              <ul>
                {result.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
    </>
    
  )
}

export default App 