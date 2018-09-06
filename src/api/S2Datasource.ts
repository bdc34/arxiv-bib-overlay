import icon from '../assets/icons-s2.png'
import logo from '../assets/source-s2.png' 
import { encodeQueryData, tolastname } from '../bib_lib'
import { BasePaper, DataSource, Paper } from '../Types'

export class S2Datasource implements DataSource {    
    data: BasePaper
    logo: any
    icon: any
    url_logo = logo
    url_icon = icon

    shortname = 'S2'
    longname = 'Semantic Scholar'
    categories = new Set(['cs', 'stat.ML'])
    homepage = 'https=//semanticscholar.org'
    api_url = 'https=//api.semanticscholar.org/v1/'
    api_params = {include_unknown_references: 'true'}

    sorting = {
        sorters: {
            paper: {name: 'Paper order', func: (i) => i.index},
            influence: {name: 'Influence', func: (i) => i.isInfluential},
            author: {name: 'First author', func: (i) => tolastname(i.authors[0])},
            title: {name: 'Title', func: (i) => i.title.toLowerCase()},
            year: {name: 'Year', func: (i) => i.year},
        },
        sorters_order: ['influence', 'title', 'author', 'year'],
        sorters_default: 'influence',
    }    

    url_paper(id: string) {
        return `${this.api_url}paper/arXiv:${id}?${encodeQueryData(this.api_params)}`
    }

    fetch_all(arxiv_id: string): Promise<DataSource> {
        //@ts-ignore 
        return null
        //return fetch( this.url_paper( arxiv_id ))
            // .then( res => res.json )
            // .then( json => this.populate( json, [], [] ) )
    }

    //     async_load(callback) {
//         this.aid = bib_lib.get_current_article()
//         const url = this.url_paper(this.aid)

//         if (url in this.cache) {
//             callback(this)
//             return
//         }

//         $.ajax({
//             type: 'GET',
//             url: bib_lib.urlproxy(url),
//             async: true,
//             timeout: bib_config.API_TIMEOUT,
//             success: $.proxy(
//                 function(data) {
//                    this.data = this.transform_result(data)
//                    this.cache[url] = this.data
//                    callback(this)
//                 }, this
//             ),
//             error: this.query_error,
//         })
//     },

    populate( base: BasePaper, citations: Paper[], references: Paper[] ): void {
        const output = base
        output.citations = {
            documents: citations,
            header: 'Citations',
            header_url: output.url + '#citingPapers',
            description: 'highly influenced citations',
            count: output.citation_count,
            sorting: this.sorting,
        }        
        output.references = {
            documents: references,
            header: 'References',
            header_url: output.url + '#citedPapers',
            description: 'highly influential references',
            count: references.length,
            sorting: this.sorting
        }
        this.data = output   
    }

}    

// S2Data.prototype = {
    
//     transform_result(data) {
//         this.reformat_document(data)

//         let ind
//         for (ind in data.citations) {
//             this.reformat_document(data.citations[ind], ind)
//         }
//         for (ind in data.references) {
//             this.reformat_document(data.references[ind], ind)
//         }

//         data.citations.header = 'Citations'
//         data.references.header = 'References'
//         data.citations.header_url = data.url + '#citingPapers'
//         data.references.header_url = data.url + '#citedPapers'
//         data.citations.description = 'highly influenced citations'
//         data.references.description = 'highly influential references'
//         this.add_counts(data)
//         return data
//     },

//     async_load(callback) {
//         this.aid = bib_lib.get_current_article()
//         const url = this.url_paper(this.aid)

//         if (url in this.cache) {
//             callback(this)
//             return
//         }

//         $.ajax({
//             type: 'GET',
//             url: bib_lib.urlproxy(url),
//             async: true,
//             timeout: bib_config.API_TIMEOUT,
//             success: $.proxy(
//                 function(data) {
//                    this.data = this.transform_result(data)
//                    this.cache[url] = this.data
//                    callback(this)
//                 }, this
//             ),
//             error: this.query_error,
//         })
//     },

//     get_paper(url, callback) {
//         if (url in this.cache) {
//             return callback(this.cache[url])
//         }

//         $.get(url, $.proxy(
//             function(data) {
//                 data = this.transform_result(data)
//                 this.cache[url] = data
//                 callback(data)
//             }, this)
//         )
//         .fail(function(err) {})
//     },
