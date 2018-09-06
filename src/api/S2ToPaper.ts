//import { encodeQueryData } from '../bib_lib'
import {  Paper } from '../Types'
import { S2Datasource } from './S2Datasource'

export class S2ToPaper {

    fetchConfig: S2Datasource
    
    constructor(fetch_config: S2Datasource) {
        this.fetchConfig = fetch_config
    }
       
    url_paperId(id: string) {
        return this.fetchConfig.api_url + 'paper/' + id + '?' + this.fetchConfig.api_params
    }

    url_author(id: string) {
        return this.fetchConfig.api_url + 'author/' + id
    }

    api_url(json: any) { return this.url_paperId(json.paperId) }
 
    url_arxiv(json: any) {
        return json.arxivId ?  'https://arxiv.org/abs/' + json.arxivId : undefined
    }

    url_doi(json: any) {
        return json.doi ? 'https://doi.org/' + json.doi : ''
    }

    searchline(json: any) {
        return [json.title, json.venue, json.year].join(' ').toLowerCase()
    }   

    outbound_names(paper: Paper) {
        const outs: string[] = []
        outs.push(this.fetchConfig.shortname.toLowerCase())
        if (paper.url_arxiv) { outs.push('arxiv') }
        if (paper.url_doi) { outs.push('doi') }
        outs.push('scholar')
        if (paper.doi || paper.arxivId) { outs.push('cite') }
        return outs
    }

    reformat_document(data: any, index: number) {
        const newdoc = new Paper()
        newdoc.api = this.api_url(data)
        newdoc.url_arxiv = this.url_arxiv(data)
        newdoc.url_doi = this.url_doi(data)
        newdoc.index = index     

        newdoc.searchline = this.searchline(newdoc)
        newdoc.outbound = this.outbound_names(newdoc)        
        return newdoc
    }

}
