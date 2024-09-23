import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <button className="my-32 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-xl font-semibold text-white hover:from-purple-600 hover:to-blue-600">
          <Link href="/dashboard">Redirect to Dashboard</Link>
        </button>
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
            About This Project
          </h1>
          <div className="mt-8 text-justify text-lg leading-7 text-gray-700">
            <p>
              This project focuses on the onboarding flow of an integration of a
              customized &apos;analytics&apos; script that can track user
              behavior on a web platform.
            </p>
            <p className="mt-4">
              The custom analytics script is coupled with a tracking ID which is
              associated with a customer account. For every user, it assigns a
              userId and stores it in localStorage. The script tracks the
              following events: initialize, click, page view, form submission,
              and email. All these events are stored in the database with a
              unique ID for each event.
            </p>
            <p className="mt-4">
              Later, all these events can be fetched for a specific tracking ID,
              providing a list of all the logs and metadata with timestamps for
              detailed analytics.
            </p>
            <h2 className="mt-8 text-2xl font-bold">Live Demo</h2>
            <ul className="list-inside list-disc">
              <li>
                Go to:{" "}
                <a
                  href="https://web-analytics-custom-integration.vercel.app/"
                  className="text-blue-500 hover:underline"
                >
                  web-analytics-custom-integration.vercel.app
                </a>
              </li>
              <li>Redirect to dashboard</li>
              <li>
                Enter <code>tanay</code> as trackingId
              </li>
              <li>
                Open demo{" "}
                <a
                  href="https://web-analytics-custom-integration.vercel.app/tracking-page.html"
                  className="text-blue-500 hover:underline"
                >
                  tracking page
                </a>
              </li>
              <li>
                Go back to dashboard and see the live events populate in events
                table.
              </li>
              <li>
                You can also copy the personalized script to track your own page
                with your own <code>trackingId</code>.
              </li>
            </ul>
            <h2 className="mt-8 text-2xl font-bold">Completed Features</h2>
            <h3 className="mt-4 text-xl font-semibold">Part 1:</h3>
            <ul className="list-inside list-disc">
              <li>Implemented Figma mocks with Next.js App Router</li>
              <li>Implemented the sidebar view</li>
              <li>
                Made the table in the Event Testing view update in real-time as
                events come in (used polling)
              </li>
              <li>Added syntax highlighting to the code snippet preview</li>
              <li>Responsive design</li>
            </ul>
            <h3 className="mt-4 text-xl font-semibold">Part 2:</h3>
            <ul className="list-inside list-disc">
              <li>Tracking events</li>
              <li>Script initialization</li>
              <li>Track page view</li>
              <li>Track email entered</li>
              <li>Track click on page element</li>
            </ul>
            <p className="mt-4">
              When emitting the events to the backend, the following metadata is
              included:
            </p>
            <ul className="list-inside list-disc">
              <li>Details relevant to the event (e.g., element ID)</li>
              <li>Visitor ID</li>
            </ul>
            <h2 className="mt-8 text-2xl font-bold">Tech Stack</h2>
            <ul className="list-inside list-disc">
              <li>Typescript</li>
              <li>Next.js App Router</li>
              <li>Front End</li>
              <li>Serverless Backend</li>
              <li>Vercel (hosting)</li>
              <li>Tailwind CSS</li>
              <li>PostgreSQL backend</li>
              <li>Prisma</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
