import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQ() {
  const faqs = [
    {
      question: "How much does flight training cost?",
      answer: "Flight training costs typically range from $10,000 to $15,000 for a Private Pilot License (PPL) in the United States. Costs include aircraft rental ($150-200/hr), instructor time ($50-75/hr), ground school ($300-500), medical certificate ($150-300), written test ($175), checkride ($500-800), and materials ($200-500). Use our tracker to monitor your actual spending."
    },
    {
      question: "Why should I track my flight training expenses?",
      answer: "Most student pilots underestimate costs by 30-50%. Tracking expenses helps you: stay within budget, identify cost-saving opportunities, provide transparency to family/sponsors, plan for completion, and avoid financial surprises during training."
    },
    {
      question: "Is my data private?",
      answer: "Absolutely. Your expense data is stored only in your browser's local storage. No account required, no servers, no tracking. Your financial information never leaves your device. Export to CSV anytime for backup."
    },
    {
      question: "Can I use this on my phone?",
      answer: "Yes! The app is fully mobile-responsive. Log expenses right after your flight lesson. Works on iOS, Android, and all modern browsers. Add to your home screen for quick access."
    },
    {
      question: "Is this flight training cost tracker free?",
      answer: "Yes, completely free. No signup required, no hidden fees, no subscriptions. Your data is stored locally in your browser for complete privacy."
    },
    {
      question: "How do I track my flight training expenses?",
      answer: "Simply add each expense with the amount, category (aircraft rental, instructor time, etc.), date, and optional notes. The app automatically calculates your total spending and shows a category breakdown. Export to CSV anytime."
    },
    {
      question: "What expense categories are included?",
      answer: "We include all major flight training expenses: Aircraft Rental, Instructor Time, Ground School, Medical Certificate, Written Test Fees, Checkride Fee, Books & Materials, Headset & Equipment, ForeFlight/EFB Subscription, Club Membership Dues, Fuel Costs, Landing/Airport Fees, and Other."
    },
    {
      question: "Can I export my data?",
      answer: "Yes! Export your complete expense history as a CSV file anytime. Perfect for tax records, sharing with family, or analyzing your training costs in spreadsheet software."
    }
  ];

  return (
    <section className="faq-section py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-400 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about tracking flight training costs
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <AccordionTrigger className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-400 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join thousands of student pilots who are successfully tracking their flight training costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://reddit.com/r/flying" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                🎓 Student Pilot Community
              </a>
              <a 
                href="https://www.faa.gov/pilots/training" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                📖 FAA Training Resources
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}