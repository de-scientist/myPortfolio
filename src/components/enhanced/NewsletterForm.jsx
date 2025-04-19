import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically make an API call to your newsletter service
      // For demonstration, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5, 0.75)}
      className="p-6 mx-auto w-full max-w-md rounded-2xl bg-tertiary shadow-card"
    >
      <h3 className="text-white text-[20px] font-bold text-center mb-4">
        Subscribe to Newsletter
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-4 py-2 w-full text-white rounded-lg bg-black-100 placeholder-secondary"
            aria-label="Email address"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-[#915EFF] rounded-lg font-bold text-white transition-all
            ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#7c51d6]'}`}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>

        {status === 'success' && (
          <p className="text-sm text-center text-green-500">
            Successfully subscribed!
          </p>
        )}

        {status === 'error' && (
          <p className="text-sm text-center text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default NewsletterForm;