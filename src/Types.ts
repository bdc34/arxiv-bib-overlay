/** Class for an author on a paper. */
export class Author {
    name: string
    url: string    
}

export class Paper {
    title: string
    authors: Author[]
    year: string
    venue: string
    citation_count: number
    recid: string
    paperId: string

    /** Index of this paper in Citations or References. */
    index: number
        
    /** URL to search for this paper in the DS i originated from. */
    api: string

    /** URL to this paper in the DS it originated from. */
    url: string
    
    doi: string
    arxivId?: string 
    url_doi: string

    /** URL to this papers abs page at arxiv.org. */
    url_arxiv?: string

    searchline: string

    /** Types of outbound links that should exist for this paper.  */
    outbound: string[]    
    
    constructor( arxivId?: string) {
        this.arxivId = arxivId
    }
}

/** Group of papers. Used for references and citations. */
export class PaperGroup {
    documents: Paper[]
    header: string
    header_url: string
    description?: string
    count?: number
    sorting: SorterConfig
}

/** A paper with citations and references. */
export class BasePaper extends Paper {
    citations?: PaperGroup
    references?: PaperGroup
}

/** Configuration of sorting for a DataSource. */
export interface SorterConfig {
    sorters: {[name: string]: Sorter}
    sorters_order: string[]
    sorters_default: string
}

export interface Sorter {
    name: string
    func: (paper: Paper) => string | number
}

export interface DataSource {        
    /* Paper last fetched. */
    data: BasePaper
    
    /** Logo image, use in TSX like <img src={ds.logo}/> */     
    logo: any

    /** Icon image, use in TSX like <img src={ds.icon}/> */     
    icon: any

    shortname: string
    longname: string 
    homepage: string

    /** Categories that this DataSource is likely to have papers for. */
    categories: Set<string> //= new Set(['hep-th', 'hep-ex', 'hep-ph', 'hep-lat', 'gr-qc'])
        
    api_url: string
    api_params: object

    sorting: SorterConfig

    /** 
     * Fetch the paper for the arxiv_id, parse it and put it in this.data.
     * 
     * Could change this to not put it in this.data and just return a Promise to the
     * paper.
     */
    fetch_all(arxiv_id: string): Promise<DataSource>
}    
