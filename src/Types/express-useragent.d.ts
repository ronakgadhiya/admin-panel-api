declare module 'express-useragent' {
    import { RequestHandler } from 'express';
  
    interface UserAgent {
      isMobile: boolean;
      isTablet: boolean;
      isDesktop: boolean;
      browser: string;
      version: string;
      os: string;
      platform: string;
      source: string;
    }
  
    interface RequestWithUserAgent extends Request {
      useragent: UserAgent;
    }
  
    function express(): RequestHandler;
  
    export default { express };
  }
  