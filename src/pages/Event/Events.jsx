import React from "react";
import scan from "../../images/scan.png";
import pefa from "../../images/pefa/pefa2.jpg";

const Events = () => {
  return (
    <>
      <section className="relative h-[70vh] w-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pefa})` }}
        ></div>
      </section>

      <div>
        <div className="container mt-5">
          <h3 className="mb-4 font-medium ">
            Important Notification Regarding Your PEFA Award Event
          </h3>
          <ul className="list-disc ps-[1rem]">
            <li className="text-base mb-3 ">
              We want to keep you informed about the status of your PEFA Award
              Event submission. Please take note of the following disclaimer for
              a smooth and successful event processing:
            </li>
            <li className="text-base mb-3 ">
              Your PEFA Award Event details have been diligently submitted to
              the relevant authorities, and processing is currently underway.
            </li>
            <li className="text-base mb-3 ">
              Ensuring the accuracy of the details you provided, including
              essential documents such as passport copies, photo scans, and bank
              statements, is crucial for a seamless processing experience.
            </li>
            <li className="text-base mb-3 ">
              Be proactive in notifying the authorities promptly of any changes
              or updates to your event details, as this ensures that your
              submission remains up-to-date and in compliance.
            </li>
            <li className="text-base mb-3 ">
              Please be aware that the processing time may vary, and there is a
              possibility of additional documentation or information being
              requested during the thorough review process.
            </li>
            <li className="text-base mb-3 ">
              While we are committed to facilitating a smooth experience, it's
              important to note that this information does not guarantee the
              automatic approval of your PEFA Award Event. The final decision is
              subject to the laws and regulations set by the respective
              authorities.
            </li>
            <li className="text-base mb-3 ">
              For the most accurate and up-to-date information on the status of
              your PEFA Award Event, we encourage you to consult directly with
              the relevant authorities.
            </li>
          </ul>
          <p></p>
        </div>
      </div>

      <section class="container py-20 px-4 bg-gray-100 rounded-lg mt-8 mb-8">
        <div class="w-full mx-auto flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0 flex justify-center flex-col items-center">
            <h5 className="text-gray-800">Download the app to</h5>
            <h2 class="text-4xl text-gray-800 mb-6 font-bold">
              Get Your Pass Now!
            </h2>
            <div class="flex flex-col gap-2 p-2 md:flex-row w-1/2 ">
              <a
                href="https://apps.apple.com/in/app/the-skytrails/id6475768819"
                target="_blank"
                class="flex items-center justify-center w-full px-2 py-2 text-center text-white bg-white border-1 rounded-2xl"
                rel="noreferrer"
              >
                <svg
                  class="w-7"
                  viewBox="0 0 40 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M32.6226 23.7016C32.6026 20.0267 34.2591 17.253 37.6118 15.2103C35.7359 12.5167 32.902 11.0347 29.1601 10.7443C25.6177 10.464 21.7461 12.8171 20.3292 12.8171C18.8324 12.8171 15.3998 10.8445 12.7057 10.8445C7.13769 10.9346 1.22048 15.3004 1.22048 24.1822C1.22048 26.8057 1.69945 29.516 2.65738 32.3131C3.93461 35.988 8.54465 45 13.3542 44.8498C15.8688 44.7897 17.645 43.0574 20.9179 43.0574C24.091 43.0574 25.7375 44.8498 28.5414 44.8498C33.3909 44.7797 37.5619 36.5888 38.7793 32.9039C32.2733 29.8298 32.6226 23.8919 32.6226 23.7016ZM26.9748 7.25968C29.6989 4.01535 29.4494 1.06142 29.3696 0C26.9648 0.140187 24.1808 1.64219 22.5943 3.49466C20.848 5.4773 19.8203 7.93058 20.0398 10.6943C22.6442 10.8945 25.019 9.55274 26.9748 7.25968Z"
                      fill="black"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="40" height="45" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <div class="flex flex-col ml-2 leading-4 text-left md:ml-3">
                  <span class="text-sm text-black">Get it on</span>
                  <span class="text-base font-semibold text-black">
                    App Store
                  </span>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.skytrails"
                target="_blank"
                class="flex items-center justify-center w-full px-2 py-2 text-center text-white bg-white border-1 rounded-2xl"
                rel="noreferrer"
              >
                <svg
                  class="w-7"
                  viewBox="-9 0 274 274"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M188.81319,178.874645 C221.272218,161.051727 245.880297,147.470853 248.001319,146.415618 C254.78648,142.806714 261.79324,133.256838 248.001319,125.838536 C243.548228,123.506467 219.573289,110.347687 188.81319,93.3795092 L146.171146,136.443648 L188.81319,178.874645 Z"
                      fill="#FFD900"
                    ></path>
                    <path
                      d="M146.171146,136.443648 L10.3940643,273.286517 C13.5808739,273.708611 17.1792251,272.864423 21.4212696,270.532353 C30.3274526,265.657168 124.739324,214.098388 188.81319,178.885198 L146.171146,136.443648 Z"
                      fill="#F43249"
                    ></path>
                    <path
                      d="M146.171146,136.443648 L188.81319,93.5905562 C188.81319,93.5905562 30.9711459,7.45172685 21.4212696,2.36549437 C17.8229184,0.233919759 13.7919209,-0.399221214 10.1830173,0.233919759 L146.171146,136.443648 Z"
                      fill="#00EE76"
                    ></path>
                    <path
                      d="M146.171146,136.443648 L10.1830173,0.233919759 C4.6641385,1.51075405 0,6.38593954 0,16.3579099 C0,32.270853 0,244.003747 0,257.162527 C0,266.290309 3.60890354,272.864423 10.3940643,273.497564 L146.171146,136.443648 Z"
                      fill="#00D3FF"
                    ></path>
                  </g>
                </svg>
                <div class="flex flex-col ml-2 leading-4 text-left md:ml-3">
                  <span class="text-sm text-black">Get it on</span>
                  <span class="text-base font-semibold text-black">
                    Play Store
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div class="md:w-1/2 flex justify-center flex-col md:flex-col items-center">
            <h2 class="text-4xl text-gray-800 mb-6 font-bold">Or Scan Here!</h2>
            <img src={scan} alt="Mobile App" class="w-64 " />
          </div>
        </div>
      </section>

      <section class="relative h-96 mb-6">
        {/* <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf')] bg-cover bg-center"></div> */}
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4257.612796294252!2d76.6644754!3d30.687216499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef154b91a85b%3A0x4d8b9df97e986631!2sChandigarh%20Group%20of%20Colleges%20(CGC)%20-%20Landran!5e1!3m2!1sen!2sin!4v1738832992933!5m2!1sen!2sin"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="container">
          <div class="absolute right-10 top-1/2 transform -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl max-w-sm">
            <h3 class="text-2xl font-bold mb-4">Event Location</h3>
            <p class="text-gray-600">
              CGC Landran
              <br />
              Sahibzada Ajit Singh Nagar
              <br />
              Punjab 140307
              <br />
            </p>
            <button class="mt-4 bg-primary-6000 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition">
              Get Directions
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;