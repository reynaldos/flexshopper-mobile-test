"use client";

const Proposition65Modal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal} // Clicking the background will close the modal
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          {/* SVG Icon for Close (X) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-0 pt-12">
          <h2 className="text-xl font-bold mb-4">
            About California Proposition 65
          </h2>

          <hr/>

          {/* Scrollable Content with adjusted text size and line height */}
          <div className="max-h-[70vh] overflow-y-auto space-y-4 text-gray-700 text-sm leading-6 py-3">
            <p>
              Proposition 65, officially the Safe Drinking Water and Toxic
              Enforcement Act of 1986, is a law that requires warnings be
              provided to California consumers when they might be exposed to
              chemicals identified by California as causing cancer or
              reproductive toxicity. The warnings are intended to help
              California consumers make informed decisions about their exposures
              to these chemicals from the products they use. The California
              Office of Environmental Health Hazard Assessment (OEHHA)
              administers the Proposition 65 program and publishes the listed
              chemicals, which includes more than 850 chemicals. In August 2016,
              OEHHA adopted new regulations, effective on August 30, 2018, which
              change the information required in Proposition 65 warnings.
            </p>

            <p>
              We are providing the following warning for products linked to this
              page:
            </p>

            <p className="font-semibold text-red-600">
              WARNING: This product contains chemicals known to the State of
              California to cause cancer and birth defects or other reproductive
              harm.
            </p>

            <h3 className="text-xl font-bold">Tools</h3>
            <p>
              California requires the following notice:
              <br />
              <span className="font-semibold text-red-600">WARNING:</span> Some
              dust created by power sanding, sawing, grinding, drilling, and
              other construction activities contains chemicals known to the
              State of California to cause cancer and birth defects or other
              reproductive harm. Some examples of these chemicals are:
            </p>
            <ul className="list-disc ml-6">
              <li>Lead from lead-based paints</li>
              <li>Crystalline silica from bricks and cement</li>
              <li>Arsenic and chromium from chemically treated lumber</li>
            </ul>
            <p>
              Your risk from exposure to these chemicals varies, depending on
              how often you do this type of work. To reduce your exposure, work
              in a well-ventilated area and with approved safety equipment, such
              as dust masks that are specially designed to filter out
              microscopic particles.
            </p>

            <h3 className="text-xl font-bold">
              Jewelry and Tiffany Style Lamps
            </h3>
            <p>
              California requires the following notice:
              <br />
              <span className="font-semibold text-red-600">WARNING:</span> This
              product contains lead, a chemical known to the State of California
              to cause cancer and birth defects or other reproductive harm. Wash
              hands after handling.
            </p>

            <h3 className="text-xl font-bold">Electrical Cords</h3>
            <p>
              California requires the following notice:
              <br />
              <span className="font-semibold text-red-600">WARNING:</span> The
              wires of this product contains chemicals known to the State of
              California to cause cancer and birth defects or other reproductive
              harm. Wash hands after handling.
            </p>

            <h3 className="text-xl font-bold">Motor Vehicles</h3>
            <p>
              California requires the following notice:
              <br />
              <span className="font-semibold text-red-600">WARNING:</span> Motor
              vehicles contain fuel, oils and fluids, battery posts, terminals
              and related accessories which contain lead and lead compounds and
              other chemicals known to the State of California to cause cancer,
              birth defects and other reproductive harm. These chemicals are
              found in vehicles, vehicle parts and accessories, both new and as
              replacements. When being serviced, these vehicles generate used
              oil, waste fluids, grease, fumes and particulates, all known to
              the State of California to cause cancer, birth defects, and
              reproductive harm.
            </p>

            <h3 className="text-xl font-bold">
              Additional Information about Proposition 65
            </h3>
            <p>
              For background on the new Proposition 65 warnings, see{" "}
              <a
                href="https://www.p65warnings.ca.gov/new-proposition-65-warnings"
                target="_blank"
                className="no-underline hover:underline text-blue-600"
                rel="noopener noreferrer"
              >
                https://www.p65warnings.ca.gov/new-proposition-65-warnings
              </a>
              .
            </p>

            <p>
              Proposition 65 and its regulations are posted at{" "}
              <a
                href="https://oehha.ca.gov/proposition-65/law/proposition-65-law-and-regulations"
                target="_blank"
                className="no-underline hover:underline text-blue-600"
                rel="noopener noreferrer"
              >
                https://oehha.ca.gov/proposition-65/law/proposition-65-law-and-regulations
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposition65Modal;
