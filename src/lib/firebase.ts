import * as Firebase from 'firebase';
import * as Moment from 'moment';

export const config = {
    apiKey: "AIzaSyDkm65E75POhTtNotK8Ygg7WMPrcqLHFuI",
    authDomain: "bartabello.firebaseapp.com",
    databaseURL: "https://bartabello.firebaseio.com",
    projectId: "bartabello",
    storageBucket: "bartabello.appspot.com",
    messagingSenderId: "726445469976"
}

export const addDashboard = (): Promise<string> => {
    return Firebase.database().ref('dashboards').push().set({
        owner: Firebase.auth().currentUser.uid,
        settings: {
            tts: {
                time: {
                    enabled: false,
                    repeat: '1h'
                },
                event: {
                    enabled: false,
                    repeat: '1h'
                }
            }
        }
    }).then((dashboard) => {
        console.log(dashboard);
        return dashboard.key;
    }).catch((err) => {
        console.log(err);
    });
}

export const assignDashboard = (ouid: string): Promise<string> => {
    return Firebase.database().ref('dashboards').orderByChild('owner').equalTo(ouid).once('value').then((snapshot) => {
        if(snapshot.val()) {
            return Object.keys(snapshot.val())[0];
        }
        return addDashboard()
    });
}

//events

export interface BartabelloEvent {
    text: string;
    repeat: string;
    timeInAdvance: string;
    date: string;
    time: string;
    timestamp: number;
}

//text to speech

export const setTtsTime = (did: string, ttsTime: boolean) => {
    let ref = Firebase.database().ref('dashboards/' + did + '/settings/tts/time');
    return ref.child('enabled').set(ttsTime);
}

export const setTtsEvent = (did: string, ttsEvent: boolean) => {
    let ref = Firebase.database().ref('dashboards/' + did + '/settings/tts/event');
    return ref.child('enabled').set(ttsEvent);
}

//events

export const addEvent = (did: string, dashboardEvent: BartabelloEvent) => {
    return Firebase.database().ref('dashboards/' + did + '/events').push()
    .set(
        dashboardEvent
    ).then((event) => {
        console.log(event);
    }).catch((err) => {
        console.log(err);
    });
}

export const updateEvent = (did: string, eid: string, dashboardEvent: BartabelloEvent) => {
    return Firebase.database().ref('dashboards/' + did + '/events/' + eid).update(
        dashboardEvent
    ).then((event) => {
        console.log(event);
    }).catch((err) => {
        console.log(err);
    });
}

export const deleteEvent = (did: string, eid: string) => {
    return Firebase.database().ref('dashboards/' + did + '/events/' + eid).remove()
    .then((cb) => {
        console.log(cb);
    }).catch((err) => {
        console.log(err);
    });
}