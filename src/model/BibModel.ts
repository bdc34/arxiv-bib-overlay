import { action, observable } from 'mobx'
import { AdsDatasource } from '../api/AdsDatasource'
import { InspireDatasource } from '../api/InspireDatasource'
import { DataSource, Paper, PaperGroup } from '../Types'

export class BibModel {    
    @observable
    inspireDs = new InspireDatasource()
    
    @observable
    adsDs = new AdsDatasource()

    @observable
    currentDs: DataSource

    @observable
    avaiableDs: DataSource[]

    @observable
    paper: Paper

    @observable
    citations: PaperGroup

    @observable
    references: PaperGroup

    @observable
    errorWhileLoading = false

    @action
    loadFromPaper( arxivId: string, categories: string): void {    
        //TODO:
        //Figure out which DS are avaiable
        //load the first
        //copy results into this.paper this.citations this.references
        
        this.inspireDs.fetch_all('0801.1021')
            .then(ds => this.populateFromDsResult(ds) )        
        //this.adsDs.fetch_all(arxivId)
            //.then( ds => this.populateFromDsResult(ds))
            //.catch( error => this.errorWhileLoading = true)
    }

    populateFromDsResult( ds: DataSource ): void {
        this.currentDs = ds
        
        this.paper = ds.data        
        if ( ds.data.citations ) {
            this.citations = ds.data.citations        
        }
        if ( ds.data.references) {
            this.references = ds.data.references
        }
    }
}