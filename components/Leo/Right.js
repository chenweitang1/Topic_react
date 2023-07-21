import React from 'react'
import styles from '@/components/Leo/Right.module.css'

export default function R() {
  return (
    <>
      <div className={`${styles.content} ${styles.scrollable} `}>
        <h1 className={styles.title}>內容描述</h1>
        <pre className={`${styles.p} ${styles.verticalExpand}`}>
          出版三十多年暢銷不墜，建基於十數萬筆經驗取樣研究，
          提出「心流」概念，並以科學方法加以探索的開創之作。
          啟發心理學、腦科學、社會學、運動學、人類學、宗教學等眾多領域研究，
          廣泛影響全球文化建構與無數人生命經驗的心理學經典。
          啟發《刻意練習》、《異數》與《深度工作力》等眾多暢銷著作，
          「羅輯思維」、「得到App」萬為綱譽為:「過去三十年最引人入勝的心理學概念。」
          「心流」是意識上和諧而有序的心理狀態，
          發生在一個人有意地將身體或心智能力發揮至極限之時。
          這樣的「最優體驗」對個人產生了什麼影響？又能如何創造呢？
          契克森米哈伊——美國心理學會主席馬汀．塞利格曼讚譽他是「全球正向心理學研究的領航者」，
          四十多年前他觀察到，超過需求門檻的物質條件，再多也不會讓人感到快樂。
          於是，他開始研究擁有創造力或卓越表現的人們，像是藝術家、科學家、運動員等，
          釐清是什麼驅使他們不為名聲或財富，而為自我價值感與生命意義而行動。
          他發現，令人最感美好的幸福時刻，經常發生在
          一個人遇到挑戰他現有能力的事，他專注地將身心能力發揮到極致之時。
          在這種狀態中，人們會忘卻時間與自我，猶如進入「自動運轉」模式，
          由於這種體驗像是自然湧現，所以契克森米哈伊稱之為——「心流」。
          決定生活品質的關鍵，在於能夠掌握內在經歷，從而影響自己怎麼解讀現實。
          處於心流狀態時，我們會感覺能夠掌握自身的意識，有目標地行動，
          不只將種種挑戰視為好的契機，也更懂得妥善運用自己的精神能量，
          生活的秩序與心靈的充實不會因為周遭難題侵擾，而時時遭到破壞。
          在這本書中，作者檢視了生命的各個階段與生活的諸多層面，
          詳盡探討心流帶來最優體驗的契機，以及與之相反的狀況，
          帶領讀者認識意識的運作，並學習控制解讀日常事件的傾向。
          讓更多日常生活進入「心流」，
          你將能在許多原本意想不到的所在經歷「最優體驗」，
          讓你的潛能與創造力發揮得更好，從而創造
          更快樂、更充實、也更具意義的人生。（更詳盡介紹可參閱目錄引文）
        </pre>
      </div>
      <div className={styles.used}>
        <h1 className={styles.title}>二手書</h1>
      </div>
    </>
  )
}
