async function matchJobResume() {
  const jobDesc = document.getElementById("jobDesc").value;
  const resumeText = document.getElementById("resumeText").value;
  const loader = document.getElementById("loader");
  const resultBox = document.getElementById("resultBox");

  if (!jobDesc || !resumeText) {
    alert("Please enter both job description and resume.");
    return;
  }

  loader.style.display = "block";
  resultBox.innerHTML = "";

  const prompt = `
You are a professional resume and job description matcher.

- Compare the resume below with the job description.
- Give a match score from 0 to 100%.
- List missing or weak keywords.
- Provide improvement suggestions.
- Suggest a more tailored resume based on the job.

Job Description:
${jobDesc}

Resume:
${resumeText}
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCdaT98AJ9iuqB4xWoyGVkQyzgjUFVslCU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No meaningful response";

    resultBox.innerHTML = `<strong>Match Results:</strong><br><br>${reply}`;
  } catch (error) {
    resultBox.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  } finally {
    loader.style.display = "none";
  }
}
