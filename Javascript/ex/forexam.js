for(i=0; i<100; i++) {
    console.log(i + 1);
}
/* for(i=1; i<=100; i++) {
    console.log(i);
}

for(i=1; i<=99; i++) {
    console.log(i+1);
}
 */

let i=0;
while (i<10) {
    i++;
    if(i % 2 === 0)   { // 짝수만
        continue; //지금꺼만 빼고 다음꺼로 넘어가~, break랑은 다른 거임!
    }
    console.log(i); 
} // 1,3,5,7,9 출력값 

//중첩 반복문
for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
        console.log(i,j);
    }
} 
/* i==0 j==0 console.log(0,0);
i==0 j==1 console.log(0,1);
i==0 j==2 console.log(0,2);
i==0 j==9 console.log(0,9);
i==0 j==10, 조건 x 
i==1 j==0 console.log(1,0);
i==1 j==9 console.log(1,9);
i==1 j==10, 조건 x */

for(let i=0; i<5; i++){
    if(i%2==0) continue;
    for(let j=0; j<5; j++){
        if(j%2==0) continue;
        for(let k=0; k<5; k++){
            if(k%2==0) continue;
            console.log(i,j,k);
        }
    }
}
/* i==0 continue
i==1 j==0 continue
i==1 j==1 k==0 continue
i==1 j==1 k==1 console.log(1, 1, 1)
i==1 j==1 k==2 continue
i==1 j==1 k==3 console.log(1, 1, 3)
i==1 j==1 k==4 continue
i==1 j==1 k==5 조건x
i==1 j==2 continue
i==1 j==3 k==0 continue
i==1 j==3 k==1 console.log(1, 3, 1)
i==1 j==3 k==2 continue
i==1 j==3 k==3 console.log(1, 3, 3)
i==1 j==3 k==4 continue
i==1 j==3 k==5 조건x
i==1 j==4 continue
i==1 j==5 조건x
i==2 continue
i==3 j==0 continue
i==3 j==1 k==0 continue
i==3 j==1 k==1 console.log(3, 1, 1)
i==3 j==1 k==2 continue
i==3 j==1 k==3 console.log(3, 1, 3)
i==3 j==1 k==4 continue
i==3 j==1 k==5 조건x
i==3 j==2 continue
i==3 j==3 k==0 continue
i==3 j==3 k==1 console.log(3, 3, 1)
i==3 j==3 k==2 continue
i==3 j==3 k==3 console.log(3, 3, 3)
i==3 j==3 k==4 continue
i==3 j==3 k==5 조건x
i==4 continue
i==5 조건 x */

for (let i=5; i >= 1; i--){
    console.log('*'.repeat(i))
}
/* 
*****
****
***
**
* */

//arr 라는 배열이 있을 때 배열의 마지막에서 세 번째 요소를 찾아보세요
const arr =[1,2,3,4,5]
arr[arr.length - 3] //3, 마지막에서 몇번 째 자리인지 빼면됨

// 배열의 마지막에 추가할 때 
const target = ['가','나','다'];
 target[target.length] = '라';
// 또는 push 사용
 target.push('마');
 // 삭제할때는 pop 사용

 // 배열의 처음에 추가할 때 unshift
 const target1 = ['나', '다','라'];
 target.unshift('가');
// 배열의 첫 번재 요소 제거할때는 shift

// 반복문으로 배열 요소 삭제하기
const arr1 = ['가', '라', '나', '다', '라', '마', '라'];
while(arr1.indexOf('라') > -1){
    arr1.splice(arr1.indexOf('라'), 1);

} // arr = ['가','나','다','마]