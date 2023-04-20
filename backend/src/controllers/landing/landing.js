// Define the Landing function to handle requests to the landing page
export const Landing = (req, res) => {
  // Send an HTML response with a simple message and styling
  res.send(`
    <html>
      <head>
        <style>
          h3, body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
          body { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        </style>
      </head>
      <body>
        <h3>Congrats We Are Live!</h3>
      </body>
    </html>
  `);
};
