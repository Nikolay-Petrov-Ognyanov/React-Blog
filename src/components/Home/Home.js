import style from "./Home.module.css"

import { Card } from "../Card/Card"

export const Home = ({
	posts
}) => {
	return (
		<section className={style["home"]}>
			{posts.length > 0 && posts.map(p => <Card key={p._id} post={p} />)}

			{posts.length === 0 && <h1>No posts yet</h1>}
		</section>
	)
}