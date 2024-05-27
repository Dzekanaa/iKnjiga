export type AuthResponseType = {
    Status?: string;
    id: number;
    Error?: string;
  };
  
export type  AuthContextType = {
  auth: boolean;
  id: number | null;
  setAuthState: (auth: boolean, id: number | null) => void;
}

export type BookData = {
  KnjigaID: number;
  Naslov: string;
  AutorID: number;
  Zanr: string;
  GodinaIzdanja: number;
  ISBN: string;
  PDFPutanja?: string;
  className: string;
};

export type BookShelfProps = {
  searchTerm: string;
};

export type DashboardProps = {
    onSearch: (term: string) => void;
};

