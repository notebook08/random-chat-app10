import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X, HelpCircle, Mail, MessageSquare, Phone, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpSupportModal({ isOpen, onClose }: HelpSupportModalProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const faqs = [
    {
      question: "How do I start a video chat?",
      answer: "Simply tap the 'Start Chatting' button on the home screen. You'll be connected with a random person instantly!"
    },
    {
      question: "What are the premium features?",
      answer: "Premium includes gender filtering, voice-only mode, unlimited chat time, priority matching, and ad-free experience."
    },
    {
      question: "How do I report inappropriate behavior?",
      answer: "During any chat, tap the 'Report' button. We take all reports seriously and review them within 24 hours."
    },
    {
      question: "Can I add friends on AjnabiCam?",
      answer: "Yes! After a great conversation, you can choose to 'Stay Connected' and add each other as friends."
    },
    {
      question: "How do coins work?",
      answer: "Coins extend your chat time. Earn them by watching ads, referring friends, or purchase coin packs in the store."
    },
    {
      question: "Is my data safe and private?",
      answer: "Absolutely! We use end-to-end encryption and never store your video calls. Your privacy is our top priority."
    }
  ];

  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5 text-blue-600" />,
      title: "Email Support",
      description: "Get help via email",
      action: "support@ajnabicam.com",
      color: "blue"
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-green-600" />,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      color: "green"
    },
    {
      icon: <Phone className="h-5 w-5 text-purple-600" />,
      title: "Phone Support",
      description: "Call us for urgent issues",
      action: "+1-800-AJNABI",
      color: "purple"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-md mx-auto bg-white border-2 border-blue-200 shadow-3xl relative overflow-hidden my-4 min-h-fit max-h-[95vh]">
        <CardHeader className="text-center relative bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X size={22} />
          </Button>
          
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold text-blue-800">
            Help & Support
          </CardTitle>
          <p className="text-blue-600 text-sm mt-2">We're here to help you!</p>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[calc(95vh-200px)] space-y-6">
          {/* Contact Methods */}
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Contact Us
            </h3>
            <div className="space-y-3">
              {contactMethods.map((method, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 border-${method.color}-200 bg-${method.color}-50 hover:shadow-md transition-all duration-200 cursor-pointer`}>
                  <div className="flex items-center gap-3">
                    <div className={`bg-${method.color}-100 p-2 rounded-full`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-${method.color}-800`}>{method.title}</h4>
                      <p className={`text-sm text-${method.color}-600`}>{method.description}</p>
                    </div>
                    <div className={`text-${method.color}-700 font-mono text-sm`}>
                      {method.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-green-600" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-sm text-gray-600 bg-gray-50 border-t border-gray-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => alert('📖 User Guide opened! Check your downloads folder.')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                User Guide
              </Button>
              
              <Button
                onClick={() => alert('🐛 Bug report form opened! Describe the issue you encountered.')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Report Bug
              </Button>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">App Information</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Version: 2.1.0</p>
              <p>Last Updated: Dec 2024</p>
              <p>Platform: Web App</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}