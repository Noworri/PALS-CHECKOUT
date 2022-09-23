export const USER_SESSION_KEY = "pal-user-session";
export const SESSION_STORAGE_KEY = "user_session_data";
export const BUSINESS_DATA_KEY = "business_data";
export const BUSINESS_ACCOUNT_DATA_KEY = "business_acc_data";
export const TRANSFER_DATA_KEY="transfer_data";
export const SUMMARY_DATA_KEY = "summary_data";
export const COLLECTION_DATA_KEY = "collection_data";

export const  COUNTRY_DATA = {
    BJ: {
      currency: "XOF",
      code: "+229",
      operators: [{ name: "MTN", value: "mtn" }, { name: "MOOV", value: "moov" }],
    },
    CI: {
      currency: "XOF",
      code: "+225",
      operators: [
        { name: "MTN", value: "mtn" },
        { name: "ORANGE", value: "orange" },
      ],
    },
    GH: {
      currency: "GHS",
      code: "+233",
      operators: [
        { name: "MTN", value: "mtn" },
        { name: "VODAFONE", value: "vodafone" },
        { name: "AIRTEL-TIGO", value: "airtel-tigo" },
      ],
    },
    TG: {
      currency: "XOF",
      code: "+227",
      operators: [{ name: "MOOV", value: "moov" }],
    },
    SN: {
      currency: "XOF",
      code: "+221",
      operators: [
        { name: "MTN", value: "MTN" },
        { name: "ORANGE", value: "orange" },
      ],
    },
    NG: {
      currency: "NGN",
      code: "+234",
      operators: [{ name: "MTN", value: "MTN" }],
    },
  };
export interface   BusinessTransactionData {
    user_id: string;
    amount: number;
    splitedAmount:number[];
    currency: string;
    callback_url: string;
    cancel_url: string;
    order_id: string;
    apiKey: string;
    country: string;
  };

  export interface   CollectionData {
    user_id: string;
    amount: number;
    currency: string;
    country: string;
    phone_no: string;
    operator: string;
  };
