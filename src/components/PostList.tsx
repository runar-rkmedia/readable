import * as React from 'react'
// import Typography from 'material-ui/Typography'
import MailIcon from 'material-ui-icons/Mail'
import DeleteIcon from 'material-ui-icons/Delete'
import List, {
  ListItem,
  ListItemAvatar,
  // ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'

export interface PostInterface {
  id: string
  timestamp: number | null
  title: string
  body: string
  author: string
  category: string
}

export default (props: {
  posts: PostInterface[]
}) => {
  return (
    <List>
      {props.posts.map(item => (
        <ListItem button={true}>
          <ListItemAvatar>
            <MailIcon />
          </ListItemAvatar>
          <ListItemText
            primary={item.title}
            secondary={item.author}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}
    // <div>{props.posts.map(item => (
    //   <div key={item.id}>{item.title}</div>
    // )
    // )}</div>
