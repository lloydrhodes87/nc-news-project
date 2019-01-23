// import Axios from "axios";

// // lesson notes

// // voting disable button after voting once

// state = { votechanfe: 0 }


// button disabled={(voteChange > 0)} to ensure only voting once
// button disabled = {(voteChange < 0)} vote down
// updatevote (1)

// updatevote(-1)

// const { votechange } = this.state
// const { votes } this.props
// <p>{votes + votechange}<p/>
// //render optimistically


// updateVote = direction => {
//     const (article_id) = this.props
//     api.patchArticleVote(articleid, direction)
//     this.setState(({ currentvote }) -> {
//         votes: currentvotes + direction
//     })
    
// }


// in api 

// const patchArticleVote = async (direction, articleid) => {
//     const { data } = await Axios.patch(`url/articleid`, {inc_votes: direction } )
//     return data.article;
// }


// infinite scroll

// in articles 

// on compnonent add event listenier to scroll


// on component mount
// window.addEventListener('scroll', this.handleScroll)

// state = {
//     articles,
//     page,
//     hassAllArticles false
// }

// handleScroll = throttle(() =>{
//     console.log('scrolled')
//     const distanceFromTop = window.scrollY;
//     const heightOfScreen = window.innerHeight;
//     const fullDocumentHeight = document.body.scrollHeight;

//     if(distanceFromTop && heightOfScreen > fullDocumentHeight - 100) {
//     console.log('ast the bottom')
//     this.setState(({page}) => ({
//         page: page+1
//     }))
// }
// }, 1000) 

//     onComponentDidUpdate() {
//         const pageUpdate = prevState.page !== this.state.page
//         if (pageUpdate && !this.state.hassAllArticles) {
//             fetchArticles()
//         }
//         IF (TOPICuPDATE) {
//             this.resetToFirstPage()
//         }

//     }


//     fetchArticles = () => {
//         api.getArticles(page).then(newArticles => {
//             this.setState(() => {
//                 artuckes: page === 1 ?  newArticles : [...articles, ...newArtulces]
//         })


        
//         })
//         .cathc(err => {
//             this.setState({
//                 hasAllArtitcles: true
//             })
//         })
//         if !newArticles.length this setstate 
//         has all arctilces true
//     }

// npm i lodash.throttle
// and import 

// import throttle from lodash.throttle;

// entire height is document.body.scrollHeight
// how much we have scrolled is window.scrollY
// window heiht is window.innerHeight

// all to work out how far away dfom bottom

// to stop how often it calls use throttle 
// it takes the cfunction and a time in seconds 


// resetToFirstPage = () => {}
// this.setState({
//     page: 1,
//     hasAllArticles: false,
// })


// infinite scroll - articles
// add event listener to scroll so it knows when the scroll has taken place.
// Npm i loadash.throttle in the terminal and then import it in

// import throttle from ‘lodash.throttle’

// state = {
//     articles
//  page
//  hasAllArticles
// }

// ComponentDidMount = () => {
//     this.fetcharticles()
//     window.addEventListener(‘scroll’, this.throttledScroll);
// }

// componentDidUpdate(prevProps, prevState) {
//     const topicUdate - prevProps.topic !== this.props.topic;
//     const pageUpdate = prevState.page !== this.state.page;
//     if (pageUpdate && !this.state.hasAllArticles) {
//         this.fetchArticles();
//     }
//     if (topicUpdate {
//         this.resettoFirstPage()
//     })
// }

// fetchArticles = () => {
//     const { topic }
//     const { page }
//     api.getArticles(topic, page)
//         .then(newarticles => {
//             this.setState(({ articles }) => ({
//                 articles: page === 1 ? newarticles : [...articles, ...newarticles],
//             }));
//             if (!newarticles.length)
//                 this.setState({ hasAllArticles: true });
//    )
//         .catch(err => {
//             this.setState({ hasAllArticles: true });
//         })
// }

// handleScroll = throttle(() => {
//     ({
//         console.log(‘scrolled’)
//  const distanceFromTop = window.scrollY
//  const screenHeight = window.innerHeight
//  const documentHeight = document.body.scollHeight

//  if(distanceFromTop + screenHeight > documentHeight - 100) {
//         console.log(‘at the bottom’)
//         this.setState(({ page }) => {
//             page: page + 1
//         })
//     }
// }, 3000)
// })

// resetToFirstPage = () => {
//     this.setState({
//         page: 1
//    hasAllArticles: false
//     })
// }