import { DocumentData, deleteDoc, getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { convertToDDMMYYYYHHMM } from '../../utils/DateUtils';
import { FaTrash } from 'react-icons/fa';
import { usePosts } from '@/contexts';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: DocumentData;
  currentUser: DocumentData | undefined;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  
  const { setPosts } = usePosts();
  const db = getFirestore();
  const postsRef = collection(db, "posts");
  const q = currentUser ? query(postsRef, where("id", "==", post.id)) : null;

  // handle delete post cards according to document id of post
  const handleDelete = async () => {
    if (q) {
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Her belge için silme işlemini gerçekleştirme
          deleteDoc(doc.ref).then(() => {
            console.log(`Belge ${doc.id} başarıyla silindi.`);
          }).catch((error) => {
            console.error("Belge silinirken hata oluştu: ", error);
          });
        });
        // post listesini güncelle
        setPosts((prevPosts) => {
          return prevPosts.filter((p) => p.id !== post.id);
        });
      }).catch((error) => {
        console.error("Belgeleri alırken hata oluştu: ", error);
      });
    }
  }

  // button to delete a post should exist if only user own post 
  return (
    <div className='flex justify-between w-full border-4 border-gray-400 mt-4 p-2 rounded-lg'>
      <p className='break-words max-w-[80%]'>{post.body}</p>
      <div className='flex flex-col text-center min-w-0'>
        <div className='flex justify-between pl-4 pr-4'>
          <Link to={`/${post.createdBy}`}><p className='truncate underline'>{post.createdBy}</p></Link> {/* Uzun isimler için metni kısaltır */}
          {currentUser && post.createdBy === currentUser.username && (
            <button onClick={handleDelete} className='text-red-500 hover:text-red-700'>
              <FaTrash />
            </button>
          )}
        </div>
        <p className='text-xs'>{convertToDDMMYYYYHHMM(post.createdAt.toDate())}</p>
      </div>
    </div>
  );
};

export default PostCard;
