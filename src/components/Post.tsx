// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Grid,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import styled from 'styled-components'
import {
  ArrowBack,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Share
} from '@material-ui/icons'
import ShowMoreText from 'react-show-more-text'
import CommentsItem, { CommentsProps } from './Comments/CommentsItem'
import Comments from './Comments/Comments'
interface PostProps {
  userId: number
  username: string
  groupId?: number
  group: string
  profileImage?: string
  whenPosted: string
  description: string
  image?: string
  likes?: number
  liked?: boolean
  commentsQuantity?: number
  comments?: CommentsProps[]
}

const useStyles = makeStyles((theme) => ({
  container: { width: '100%', height: '100%' },
  paper: {
    width: '100%',
    height: '100%',
    minWidth: 'fit-content',
    minHeight: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 12,
    position: 'relative'
  },
  addComment: {
    height: '100%',
    backgroundColor: theme.palette.grey[100],
    borderRadius: '0.4rem;'
  },
  post: {
    height: '5.5rem',
    fontSize: '2rem;',
    marginLeft: '3rem',
    paddingLeft: '3rem',
    paddingRight: '3rem'
  }
}))

const Post: React.FC<PostProps> = ({
  comments,
  commentsQuantity,
  description,
  image,
  liked,
  likes,
  username,
  whenPosted,
  profileImage,
  group
}) => {
  const classes = useStyles()

  const [postDataRef, setPostDataRef] = useState<HTMLDivElement | null>(null)

  const [wasLiked, setWasLiked] = useState(liked || false)

  const [openComments, setOpenComments] = React.useState(false)

  const handleModal = () => setOpenComments(!openComments)

  return (
    <Container>
      <Grid className={classes.container}>
        <Paper elevation={2} className={classes.paper}>
          <div className="main-content">
            <Side type="button">
              <Link href="#">
                <img
                  src={profileImage || '/no-profile-image.png'}
                  alt="profile image"
                />
              </Link>
            </Side>
            <Body>
              <Header>
                <h6>
                  <Link href="#">{username}</Link>
                </h6>{' '}
                <span>
                  in <Link href="#">{group}</Link> - {whenPosted}
                </span>
              </Header>
              <div className="post-data" ref={setPostDataRef}>
                <ShowMoreText
                  more="Show More"
                  less="Show Less"
                  expanded={false}
                  width={
                    postDataRef
                      ? (postDataRef.offsetWidth as number) - 10
                      : undefined
                  }
                  className="post-text"
                  truncatedEndingComponent={'... '}
                >
                  {description}
                </ShowMoreText>
                {image && <img src={image} alt="post image" />}
              </div>
            </Body>
          </div>
          <Options>
            <div className="option">
              <button type="button" onClick={() => setWasLiked(!wasLiked)}>
                {wasLiked ? <Favorite /> : <FavoriteBorder />}
                <span>
                  {((): number => {
                    if (likes === 0 || likes === undefined) {
                      if (wasLiked) {
                        return 1
                      } else {
                        return 0
                      }
                    } else {
                      if (wasLiked) {
                        return likes + 1
                      } else {
                        return likes
                      }
                    }
                  })()}
                </span>
              </button>
            </div>
            <div className="option">
              <button type="button" onClick={handleModal}>
                <ChatBubbleOutline />
                <span>{commentsQuantity || 0}</span>
              </button>
            </div>
            <div className="option">
              <button>
                <Share />
              </button>
            </div>
          </Options>
        </Paper>
      </Grid>
      <Modal open={openComments} onClose={handleModal}>
        <CommentsContainer>
          <div className="title">
            <h6>All Comments ({commentsQuantity || 0})</h6>
            <button type="button" onClick={handleModal}>
              <ArrowBack />
            </button>
          </div>
          <div className="add-comment">
            <img
              src={profileImage || 'no-profile-image.png'}
              alt="profile image"
              className="profile-image"
            />
            <TextField
              multiline
              placeholder="Add a comment..."
              className={classes.addComment}
              fullWidth
              color="primary"
              InputProps={{
                style: { height: '100%', fontSize: '2rem', padding: '1.5rem' }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.post}
            >
              Post
            </Button>
          </div>
          <Comments>
            {comments ? (
              comments.map((e, i) => (
                <CommentsItem
                  key={i}
                  username={e.username}
                  whenPosted={e.whenPosted}
                  liked={e.liked}
                  likes={e.likes}
                  disliked={e.disliked}
                  dislikes={e.dislikes}
                  profileImage={e.profileImage}
                  text={e.text}
                />
              ))
            ) : (
              <Typography variant="h2">No comments</Typography>
            )}
          </Comments>
        </CommentsContainer>
      </Modal>
    </Container>
  )
}

export default Post

const Container = styled.div`
  padding: 0.5rem;

  .main-content {
    display: flex;
    height: 90%;
    width: 100%;
  }
`

const Side = styled.button`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding-right: 16px;
  padding-left: 16px;
  background: none;
  border: none;
  text-decoration: none;
  color: unset;

  img {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #c3c3c3;
    border: none;
    font-size: 0;
  }
`

const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-right: 16px;
  flex-direction: column;

  .post-data {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    * {
      font-size: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      border-radius: 3rem;
      object-fit: cover;
      font-size: 0px !important;
      margin-top: 0.6rem;
    }

    .post-text {
      font-size: 100%;
      font-size: 1.4rem;
    }
  }
`

const Options = styled.div`
  width: 100%;
  height: 10%;
  padding-top: 0.5rem;
  min-height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  .option {
    padding: 0;
    max-height: fit-content;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    text-decoration: none;
    padding: 0.5rem;

    button {
      background: none;
      border: none;
      border-radius: 50%;
      color: ${(p) => p.theme.palette.text.secondary};
      transition: 300ms ease;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 200ms ease;

      :hover {
        color: ${(p) => p.theme.palette.secondary.main};
      }

      svg {
        width: 3.3rem;
        height: 3.3rem;
        margin: 0 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background-color 300ms ease;

        :hover {
          background-color: rgba(0, 0, 0, 0.2);
        }

        :active {
          background-color: rgba(0, 0, 0, 0.08);
          transition: 100ms ease;
        }
      }

      span {
        font-size: 1.5rem;
        margin-left: 0.5rem;
      }
    }
  }
`

const Header = styled.div`
  width: 100%;
  color: ${(p) => p.theme.palette.text.secondary};
  display: flex;

  * {
    font-size: 1.5rem;
    cursor: pointer;
  }

  h6 {
    font-weight: bold;
    color: ${(p) => p.theme.palette.text.primary};
  }

  span {
    margin-left: 0.5rem;
  }
`

const CommentsContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 90vh;
  width: 90vw;
  background: ${(p) => p.theme.palette.background.paper};
  padding: 3rem;
  border-radius: 3rem 3rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @keyframes fadeIn {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, 0);
    }
  }
  animation: fadeIn 0.5s ease;

  .title {
    width: 100%;
    color: ${(p) => p.theme.palette.text.primary};
    display: flex;
    justify-content: space-between;

    h6 {
      text-align: left;
      font-size: 2rem;
    }

    button {
      background: none;
      border: none;
      border-radius: 50%;
      transition: 200ms ease;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: fit-content;
      padding: 1rem;

      :hover {
        background-color: rgba(0, 0, 0, 0.2);
      }

      :active {
        background-color: rgba(0, 0, 0, 0.08);
        transition: 100ms ease;
      }

      svg {
        width: 2.4rem;
        height: 2.4rem;
        padding: 0;
        margin: 0;
      }
    }
  }

  .add-comment {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 10%;

    .profile-image {
      background-color: #c4c4c4;
      width: 5.5rem;
      height: 5.5rem;
      min-width: 5.5rem;
      min-height: 5.5rem;
      border-radius: 50%;
      margin-right: 3rem;
      font-size: 0px;
    }
  }
`
