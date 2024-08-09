declare namespace CategoryI {
  export interface EditCategory {
    id: string;
    module?: string;
    category?: string;
  }

  export interface Id {
    id: string;
  }
  export interface GQ {
    question: string;
  }

  export interface Delete extends Id {
    status: string;
  }
}
