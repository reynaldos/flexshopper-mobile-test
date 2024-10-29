import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-main700 p-6 py-12 flex flex-col items-center justify-between shadow-md max-w-md mx-auto text-white">
      <p className="text-sm leading-5 my-4">
        ©2024 FlexShopper, LLC. All rights reserved.
      </p>

      <p className="text-xs leading-5">
        <sup>1</sup> If you are approved for a lease this is your estimated
        weekly lease payment. On this site, we use the terms &quot;lease,&quot;
        &quot;lease agreement,&quot; &quot;rental-purchase agreement&quot; and
        &quot;agreement&quot; the same. (We usually use the term &quot;Lease.&quot;)
        Under your Lease, you can: (a) weekly, biweekly, or monthly payments or exercise
        an Early Purchase Option pursuant to your payment offer and some restrictions
        may apply in CA to acquire Ownership of the rented goods or (b) rent the goods
        for at least the initial term and then end the lease when you want by making all
        required payments and returning the goods. In NC, the final payment required to
        purchase the rented goods will be an amount greater than 10% of the Cash Price.
        If you are approved for a loan the weekly payment is only an estimate. Please
        review the actual terms in your loan agreement if you are approved. Your rates,
        terms and payment schedule are subject to approval pursuant to underwriting
        criteria and may vary by state. FlexShopper provides offers for Lease to Own
        Options, however, we do not make any loan or credit decisions and are not
        representative, brokers or agents for any Lenders.
      </p>

      <p className="text-xs mt-4 leading-5">
        <sup>3</sup> If approved by FlexShopper, you can exercise FlexShopper&apos;s
        90 day same as cash option. After 90 days, you also have an Early Purchase
        Option that allows you to own item(s) for less. Simply refer to the table in
        your Lease to look up the Early Purchase Option amount after each payment date.
        If approved by another payment option provider, please refer to the terms and
        conditions of your agreement.
      </p>

      <p className="text-xs mt-4 leading-5">
        <sup>5</sup> Good credit is not necessary but not everyone with bad credit
        is approved. Our goal is to help consumers with not so perfect credit get
        goods they want through a payment offer that works for you.
      </p>

      <p className="text-xs mt-4 leading-5">
        <sup>7</sup> An initial payment or security deposit and/or payment may be
        required before fulfillment.
      </p>

      <p className="text-xs mt-4 leading-5">
        <sup>9</sup> All lease/loan decisions and rates and terms are subject to
        approval pursuant to underwriting criteria related to the applicant&apos;s
        credit quality. Rates and terms may also vary depending upon the state where
        you reside.
      </p>
    </footer>
  );
};

export default Footer;