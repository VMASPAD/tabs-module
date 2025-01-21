import React from "react";

function Footer() {
  return (
    <div className="h-24 bg-gray-100 grid grid-cols-3 items-center border-t-2 border-gray-200">
      <p></p>
      <div className="flex items-center  ">
        <img
          src="https://private-avatars.githubusercontent.com/u/61850218?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MzQ0Njk4NjAsIm5iZiI6MTczNDQ2ODY2MCwicGF0aCI6Ii91LzYxODUwMjE4In0.EV6qcRpp8i7zyuUDWO-buJpMXwwIaCmkZi4haT1QNxo&v=4"
          alt=""
          className="w-8 rounded-full mr-2"
        />
        <p>
          By{" "}
          <a href="https://portfoliotavm.com/" className="underline">
            Tomas Avila
          </a>
        </p>
      </div>
      <p></p>
    </div>
  );
}

export default Footer;