import {
  AsyncStorage,
} from 'react-native';

/**
 * 冒一个时间比较短的Toast
 * @param content
 */
//更新题库目录存到ays里面
const update = () => {
    var url="http://api.wevet.cn/Api/Main";
    let formData = new FormData();
    formData.append("action","getIdArray");
    fetch(url,{
            method:'POST',
            headers:{
        },
            body:formData,
        })
        .then((response) => response.json())
        .then((responseData)=>{
            if(responseData.code == '99999'){
                imgUrl = responseData.data;
                AsyncStorage.setItem('idtree',JSON.stringify(imgUrl)).then(
                        ()=>{   //成功的操作
                            // console.log(JSON.stringify(imgUrl));
                            // console.log("idtree保存成功!");
                        },
                    );
            }
            else{
                // console.log("获取idtree失败");
            }
        })  
        .catch((error)=>{
            // console.log("error"+error);
        });
}
//获取所有题目id
const getIdTree = () =>{
    AsyncStorage.getItem('idtree',(error,text)=>{
      if(text=== null ){
        alert("idtree 没有对应的值");
        return 0;
      }else{
        //删除数据
        console.log(text);
        return text;
      }
    });
}

export default{
    update,
    getIdTree
}