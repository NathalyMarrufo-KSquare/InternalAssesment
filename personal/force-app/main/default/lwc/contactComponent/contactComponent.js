import { LightningElement,api,wire, track } from 'lwc';

import findContactByAccountId from '@salesforce/apex/contactRelatedController.findContactByAccountId';
/* import getInfoContact from '@salesforce/apex/contactRelatedController.getInfoContact';
 */

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PROFILE_PICTURE__C_FIELD from '@salesforce/schema/Contact.Profile_Picture__c';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';


export default class ContactComponent extends LightningElement {
    @track showDetailsCard= false;      
     
    @track activeForm= 'New Contact';
    @track showContactForm = false;

    //Button code and show card
    @track activeSearch = 'Contact Search';
    @track showContact = false;
    handleClick(event){
        const controlButton = event.target.label;
        if (controlButton === 'Contact Search') {
            this.activeSearch = 'Close';
            this.showContact = true;
           

            
        }
        else if (controlButton === 'Close') {
            this.activeSearch = 'Contact Search';
            this.showContact = false; 
            this.showDetailsCard = false;
            this.showContactForm = false;
            this.activeForm= 'Close';
            
        }
    }

    //Search code
    @api searchKey= '';

    handleChanged(event){
        this.searchKey = event.target.value;

        findContactByAccountId({searchContact:this.searchKey,accountIdFromLwc : this.recordId})
        .then(res =>{
            this.data = res;
        })
        .catch(error=>{
            console.log("An error in search has occurred: "+ error);
        })

    }


    //Data table data
    columns =  [
        { label: 'Name', fieldName: 'Name', },
        { label: 'Email', fieldName: 'Email',  type: 'email'},
        { label: 'Phone', fieldName: 'Phone', type: 'phone'},];

        @track data = [];
        @api recordId;

        connectedCallback(){
            findContactByAccountId({accountIdFromLwc : this.recordId})
            .then(response =>{
                this.data = response;
            })
            .catch(errorC=>{
                console.log("An error has occurred: "+ errorC);
            })
        }

        @api nameContactSelected='';
        @api pictureContactSelected='';
        @api emailContactSelected='';
        @api phoneContactSelected='';
        
        //When a contact is selected
        handleSelectItem(event){
            var selectedRows = event.detail.selectedRows;
            //alert('selected contact is:::: '+JSON.stringify(selectedRows[0]));
            this.nameContactSelected= selectedRows[0].Name;
            this.pictureContactSelected= selectedRows[0].Profile_Picture__c;
            this.emailContactSelected= selectedRows[0].Email;
            this.phoneContactSelected= selectedRows[0].Phone;
            this.showDetailsCard= true;
        }

        //Show Contact form
        handleContactForm(event){
        const controlButton = event.target.label;
        if (controlButton === 'New Contact') {
            this.showContactForm = true;
            this.activeForm = 'Close';
            
        }
        else if (controlButton === 'Close') {
            this.activeForm = 'New Contact';
            this.showContactForm = false;
        }
    }
        //Contact creation code
        objectApiName = CONTACT_OBJECT;
        fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FIELD, PHONE_FIELD, PROFILE_PICTURE__C_FIELD, ACCOUNTID_FIELD];


        handleSuccess(event){
            const toastEvent = new ShowToastEvent({
                title: "The contact was created.",
                message: "New Record ID:"+ event.detail.id,
                variant: "success"
            });
            this.dispatchEvent(toastEvent);
        }

       /*  connectedCallback(){
            getInfoContact({accountIdFromLwc : this.recordId})
            .then(response =>{
                this.data = response;
            })
        } */

       /*  reContacts;
        selectedAccount;
        accountMap;
    
        @track selectedAccountId;
        
        @wire(findContactByAccountId) 
        wiredContacts({ data, error }) {
            if (data) {
                this.reContacts = data;
            } else if (error) {
                console.error(error);
            }
            
        }
        handleClick(event){
            const accountId = event.currentTarget.dataset.accountId;
            this.selectedAccount = this.accounts.find(account => account.Id === accountId);
            this.selectedAccountId = event.currentTarget.dataset.accountId;  
        } */
    


}