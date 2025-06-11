export type PagedResult<T> = {
  results: T[];
  pageCount: number;
  totalCount: number;
};
export type Auction = {
  reservePrice: number;
  seller: string;
  winner?: string;
  soldAmount: number;
  currentHighBid: number;
  createdAt: string;
  updatedAt: string;
  auctionEnd: string;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
  id: string;
};

export interface ResponseData<T> {
  message: string
  data: T
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Payment utility functions
export const PaymentUtils = {
  /**
   * Generate payment callback URLs for different platforms
   */
  generateCallbackUrls: (baseUrl?: string) => {
    const mobileDeepLink = 'aloha://payment-callback';
    const webFallback = baseUrl ? `${baseUrl}/payment-callback` : 'https://your-domain.com/payment-callback';
    const universalLink = baseUrl ? `${baseUrl}/app/payment-callback` : 'https://your-domain.com/app/payment-callback';
    
    return {
      mobile: mobileDeepLink,
      web: webFallback,
      universal: universalLink
    };
  },

  /**
   * Parse payment callback URL and extract parameters
   */
  parseCallbackUrl: (url: string) => {
    try {
      let parsedUrl: URL;
      
      // Handle deep links
      if (url.startsWith('aloha://')) {
        parsedUrl = new URL(url.replace('aloha://', 'https://dummy.com/'));
      } else {
        parsedUrl = new URL(url);
      }
      
      return {
        status: parsedUrl.searchParams.get('status') || 'unknown',
        transactionId: parsedUrl.searchParams.get('transactionId'),
        amount: parsedUrl.searchParams.get('amount'),
        orderId: parsedUrl.searchParams.get('orderId'),
        timestamp: parsedUrl.searchParams.get('timestamp')
      };
    } catch (error) {
      console.error('Error parsing payment callback URL:', error);
      return {
        status: 'error',
        transactionId: null,
        amount: null,
        orderId: null,
        timestamp: null
      };
    }
  },

  /**
   * Validate if URL is a valid payment callback
   */
  isPaymentCallback: (url: string): boolean => {
    return url.startsWith('aloha://payment-callback') || 
           url.includes('/payment-callback') || 
           url.includes('/app/payment-callback');
  }
};