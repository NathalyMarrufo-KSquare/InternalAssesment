trigger AccountTrigger on Account (after update) {

    
    //Database.executeBatch(new batchClass(),200);

    if (Trigger.isAfter && Trigger.isUpdate) {
        Set<Id> accountIdUpdated = new Set<Id>();
        for (Account accountNewRecord : Trigger.New) {
            Account accountOldRecord = Trigger.OldMap.get(accountNewRecord.Id);
            if (accountNewRecord.Push_To_Vendor__c== 'Yes') {
                accountIdUpdated.add(accountNewRecord.Id);
                
            }
            
        }

        List<Account> accountsChangedIds = [SELECT id, name, (SELECT id, name, Push_Date__c FROM Contacts) FROM Account WHERE ID in: accountIdUpdated];

        List<Contact> contactsToUpdate = new List<Contact>();

        for (Account accous: accountsChangedIds) {
            List<Contact> accountContacts = accous.Contacts;
            
            for (Contact con: accountContacts) {
                con.Push_Date__c = System.now();
                contactsToUpdate.add(con);
            }
        }

        if (contactsToUpdate.size()>0) {
            UPDATE contactsToUpdate;
            
        }

    }


}