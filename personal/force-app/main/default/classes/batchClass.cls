public with sharing class batchClass implements Database.Batchable<SObject>{
  
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator('SELECT id from Contact');
    }

    public void execute(Database.BatchableContext bc, List<Contact> sublistQUery){
        for(Contact con: sublistQUery){
            con.name;
            System.debug('@@ 200 done')
        }
    }

    public void finish(Database.BatchableContext bc){
        System.debug('@@ Batches done');
    }
}