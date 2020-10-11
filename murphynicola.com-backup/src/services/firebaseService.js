import firebase from '../firebase/firebase';

const db = firebase.firestore().collection('app');
const storage = firebase.storage().ref();

export const getAll = () => {
    return db.get()
        .then(snapshot => {
            const data = {};
            if (snapshot) {
                snapshot.docs.forEach(doc => {
                    data[doc.id] = doc.data();
                });
            };
            return data;
        })
        .catch(err => console.error(err));
};


export const updateAbout = async data => {
    const isNewImage = data.imageURL.startsWith('data');

    if (isNewImage) {
        try {
            const ref = storage.child('about/profile-picture.jpg');
            const uploadTask = await ref.putString(data.imageURL, 'data_url');
            const downloadURL = await uploadTask.ref.getDownloadURL();
            data.image = downloadURL;
        }
        catch (err) {
            console.log(err);
        };
    };

    await db.doc('about').set({
        text: data.text,
        imageURL: data.imageURL
    });

    return data;
};

export const updateLanding = async data => {
    const promiseData = await data.map(async (item, index) => {
        const isNewImage = item.imageURL.startsWith('data');

        if (isNewImage) {
            try {
                const ref = storage.child(`landing/landing-${index}.png`);
                const uploadTask = await ref.putString(item.imageURL, 'data_url');
                item.imageURL = await uploadTask.ref.getDownloadURL();
            }
            catch (err) {
                console.log(err);
            };
        };
        return item;
    });

    const updatedData = await Promise.all(promiseData);
    await db.doc('landing').set({ data: updatedData });
    return { data: updatedData };
};

export const updateProject = async (item, data, index) => {
    const promiseData = await item.images.map(async (image, i) => {
        const isNewImage = image.startsWith('data');
        const projectName = item.data.project.toLowerCase().replaceAll(' ', '-')

        if (isNewImage) {
            try {
                const ref = storage.child(`projects/${projectName}/${projectName}-${i}.png`);
                const uploadTask = await ref.putString(image, 'data_url');
                item.images[i] = await uploadTask.ref.getDownloadURL();
            }
            catch (err) {
                console.log(err);
            };
        };
    });

    await Promise.all(promiseData);

    item.work = {
        text: item.data.project,
        url: item.data.project.toLowerCase().replaceAll(' ', '-'),
        imageURL: item.images[0],
    }

    data[index] = item;
    await db.doc('projects').set({ data: data });
    return { data };
};

export const deleteProject = async (data, folder) => {
    await db.doc('projects').set({ data: data });
    await storage.child(`projects/${folder}`).listAll().then(async results => {
        const promises = results.items.map((item) => {
            return item.delete();
        });

        await Promise.all(promises);
    });

    return { data };
};
