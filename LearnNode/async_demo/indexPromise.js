console.log('Before');
//Promise based approach
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

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
            resolve(['repo1', 'repo2', 'repo3']);
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