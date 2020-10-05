console.log('Before');
//Async and Await approach
async function displayCommits(){
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }catch(err){
        console.log('Error: ', err.message);
    }
}

displayCommits();

console.log('After');

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from database..');
            resolve({id : id, gitHubUsername: 'Mukesh K'});
        }, 2000);
    });
}

function getRepositories(username){
     return new Promise((resolve ,reject) => {
        setTimeout(() => {
            console.log('Reading a repositories from GitHub API...');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Couldnot get the repos!'));
        }, 2000);
     });
}

function getCommits(repos){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}