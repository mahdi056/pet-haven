

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-xl p-10">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">
          About Pet Haven
        </h1>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            <strong className="text-orange-500">Pet Haven</strong> is a
            web-based pet adoption and donation platform dedicated to connecting
            loving homes with pets in need. Our goal is to create a secure and
            transparent environment where adoption, responsible pet care, and
            community support come together.
          </p>

          <p>
            Users can add pets for adoption, browse available pets in real time,
            and submit adoption requests through a secure authentication system.
            We ensure a smooth and trustworthy experience for both adopters and
            pet owners.
          </p>

          <p>
            Pet Haven also supports animal welfare through donation campaigns.
            With secure Stripe-based payments, users can contribute directly to
            meaningful causes such as medical treatments, rescue efforts, and
            shelter improvements.
          </p>

          <p>
            In addition, our platform allows users to sell pet accessories,
            creating a marketplace that supports pet owners and small sellers
            within the community.
          </p>

          <p>
            At Pet Haven, we believe every pet deserves a safe and caring home.
            Whether you are adopting, donating, or shopping for your pet, we are
            committed to making your experience simple, secure, and impactful.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-12 pt-8">
        

          <p className="text-gray-700 mb-2">
            For any enquiries, Please feel free to contact us:
          </p>

          <p className="text-gray-800">
         
            <p>Email: ahnafmahdi12@gmail.com</p>
          </p>

          <p className="text-gray-800 mt-1">
           
            <p>Phone: +880 1707226784</p>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;