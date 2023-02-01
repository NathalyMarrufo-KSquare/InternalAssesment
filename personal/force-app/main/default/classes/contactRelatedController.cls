public with sharing class contactRelatedController {
        @AuraEnabled(cacheable=true)
        public static List<Contact> findContactByAccountId(String accountIdFromLwc, String searchContact) {
                if (searchContact != null && searchContact!='') {
                        String contactName = '%'+ searchContact +'%';
                        return [
                                SELECT Name,Email, Phone, Profile_Picture__c	  
                                FROM Contact Where AccountId =: accountIdFromLwc AND Name Like :contactName];  
                }else {
                     return [
                SELECT Name,Email, Phone, Profile_Picture__c	  
                FROM Contact Where AccountId =: accountIdFromLwc 
                ];    
                }
                
           
        }
        // @AuraEnabled(cacheable=true)
        // public static List<Contact> getInfoContact(String accountIdFromLwc) {      
        //     return [
        //         SELECT Profile_Picture__c,Name,Phone,Email  
        //         FROM Contact Where AccountId =: accountIdFromLwc 
        //         ];
        // }
}