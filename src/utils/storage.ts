// Safe localStorage wrapper with null checks
export const storage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.warn('localStorage not available:', error);
      return null;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('localStorage not available:', error);
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('localStorage not available:', error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.clear();
        return true;
      }
      return false;
    } catch (error) {
      console.warn('localStorage not available:', error);
      return false;
    }
  }
};

// Safe sessionStorage wrapper with null checks
export const sessionStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.warn('sessionStorage not available:', error);
      return null;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('sessionStorage not available:', error);
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('sessionStorage not available:', error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.clear();
        return true;
      }
      return false;
    } catch (error) {
      console.warn('sessionStorage not available:', error);
      return false;
    }
  }
};