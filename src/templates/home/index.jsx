import { Component } from "react";

import "./styles.css";
import { Posts } from "../../components/Posts/index";

import { loadPosts } from "../../utils/load-posts";

import { Button } from "../../components/Button/index";

import { TextInput } from "../../components/TextInput/index"

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;
         {/* Acima está a lógica para a busca do posts.*/}
    return (
      <section className="container">
        <div className="search-container">
        {!!searchValue && (<h1>Search value: {searchValue}</h1>)}
        {/* a expressão !! converte o valor para booleano. O intuito é utilizar a avaliação de curto circuito do JS. Nesse caso se for falso faça o que está entre parenteses*/}
        {/* Acima ele está dizendo: se houver busca, exiba o search value.*/}
        <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>

        {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : 'Não existem posts com esse valor de busca.'}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
          {/* Acima ele está dizendo: se não houver busca, quero exibir o botão.*/}
        </div>
      </section>
    );
  }
}
export default Home;
