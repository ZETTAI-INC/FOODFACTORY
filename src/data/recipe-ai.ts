import { Product, getProductById } from "./products";

export type RecipeStep = {
  step: number;
  title: string;
  detail: string;
  duration: string;
  temperature?: string;
  equipment?: string;
};

export type RecipeProposal = {
  productName: string;
  batchSize: string;
  ingredients: { name: string; amount: string; note?: string }[];
  steps: RecipeStep[];
  qualityPoints: string[];
  costEstimate: string;
  tips: string[];
};

type RecipeTemplate = {
  productId: string;
  variants: {
    condition: string;
    recipe: RecipeProposal;
  }[];
};

const recipeTemplates: RecipeTemplate[] = [
  {
    productId: "21",
    variants: [
      {
        condition: "default",
        recipe: {
          productName: "蒸し鶏（プレーン）",
          batchSize: "100kg仕込み",
          ingredients: [
            { name: "鶏むね肉（国産）", amount: "80kg", note: "皮付き、2L〜3Lサイズ推奨" },
            { name: "食塩", amount: "1.6kg", note: "肉重量の2%" },
            { name: "生姜（すりおろし）", amount: "0.4kg" },
            { name: "清酒", amount: "2.0L", note: "料理酒可" },
            { name: "昆布だし（濃縮）", amount: "1.0L" },
            { name: "水", amount: "15.0L", note: "ブライン液用" },
          ],
          steps: [
            { step: 1, title: "原料検品・下処理", detail: "鶏むね肉の品温（−18℃以下）確認。流水解凍で中心温度0〜2℃まで解凍。脂肪・筋の除去、規格外品の選別。", duration: "約2時間", temperature: "0〜2℃", equipment: "解凍槽" },
            { step: 2, title: "ブライン液調合", detail: "水15Lに食塩1.6kg、生姜0.4kg、清酒2.0L、昆布だし1.0Lを混合。塩分濃度9〜10%に調整。", duration: "15分", temperature: "5℃以下", equipment: "調合タンク" },
            { step: 3, title: "漬け込み（タンブリング）", detail: "解凍した鶏むね肉をブライン液に投入。真空タンブラーで30分間回転させ、肉にしっかり浸透させる。", duration: "30分", temperature: "5℃以下", equipment: "真空タンブラー" },
            { step: 4, title: "整形・並べ", detail: "漬け込み後の鶏肉を1枚ずつ広げ、スチームコンベクションの天板に並べる。重ならないよう注意。", duration: "30分", equipment: "天板・ラック" },
            { step: 5, title: "スチーム加熱", detail: "スチームモードで加熱。中心温度が75℃以上1分間を確認。しっとり感を保つため加熱しすぎに注意。", duration: "25〜30分", temperature: "スチーム100℃ / 中心75℃以上", equipment: "スチームコンベクションオーブン" },
            { step: 6, title: "急速冷却", detail: "加熱後30分以内にブラストチラーで中心温度10℃以下まで冷却。細菌増殖を防止。", duration: "40〜60分", temperature: "10℃以下", equipment: "ブラストチラー" },
            { step: 7, title: "スライス・計量", detail: "冷却後、スライサーで5mm厚にスライス。200g/300g/500gの規格ごとに計量・パック。", duration: "1時間", temperature: "10℃以下", equipment: "スライサー、自動計量機" },
            { step: 8, title: "真空包装・急速凍結", detail: "真空パックし、急速凍結庫で中心温度−18℃以下まで凍結。凍結後、金属探知機を通過させる。", duration: "3〜4時間", temperature: "−30℃以下（庫内）", equipment: "真空包装機、急速凍結庫、金属探知機" },
          ],
          qualityPoints: [
            "中心温度75℃以上1分間の加熱殺菌を厳守（記録を残す）",
            "加熱後30分以内に10℃以下への冷却を達成すること",
            "ブライン液の塩分濃度を毎回測定し9〜10%を維持",
            "スライス厚の均一性を抜き取り検査（許容誤差±1mm）",
            "金属探知機通過を全パック必須（Fe φ1.0mm / SUS φ1.5mm以上検出）",
          ],
          costEstimate: "原材料費：約280円/200gパック（鶏むね肉相場により変動）",
          tips: [
            "鶏むね肉は2L〜3Lサイズが歩留まりと食感のバランスが最も良い",
            "タンブリング時間を長くしすぎると肉質が崩れるため30分を目安に",
            "スチーム加熱時の庫内温度は100℃が最適。85℃だと時間がかかりパサつく",
            "夏場は解凍時の品温管理を特に厳重に。ドリップが多い場合はペーパーで除去",
          ],
        },
      },
      {
        condition: "コスト削減",
        recipe: {
          productName: "蒸し鶏（プレーン）コスト最適化版",
          batchSize: "100kg仕込み",
          ingredients: [
            { name: "鶏むね肉（ブラジル産）", amount: "80kg", note: "IQF、2Lサイズ" },
            { name: "食塩", amount: "1.6kg", note: "肉重量の2%" },
            { name: "生姜パウダー", amount: "0.08kg", note: "生おろしの代替" },
            { name: "料理酒", amount: "2.0L" },
            { name: "昆布エキス（粉末）", amount: "0.1kg", note: "濃縮だしの代替" },
            { name: "水", amount: "16.0L" },
          ],
          steps: [
            { step: 1, title: "原料検品・下処理", detail: "IQF鶏むね肉の品温確認。流水解凍で中心温度0〜2℃まで解凍。", duration: "約2時間", temperature: "0〜2℃", equipment: "解凍槽" },
            { step: 2, title: "ブライン液調合", detail: "水16Lに食塩、生姜パウダー、料理酒、昆布エキスを溶解。パウダー類はダマにならないよう先にぬるま湯で溶く。", duration: "15分", temperature: "5℃以下", equipment: "調合タンク" },
            { step: 3, title: "インジェクション＋タンブリング", detail: "インジェクターでブライン液を肉重量の15%注入後、真空タンブラーで20分。浸透効率を上げてタンブリング時間短縮。", duration: "25分", temperature: "5℃以下", equipment: "インジェクター、真空タンブラー" },
            { step: 4, title: "整形・並べ", detail: "天板に並べる。1バッチあたりの天板枚数を最大化してオーブン稼働効率を上げる。", duration: "25分", equipment: "天板・ラック" },
            { step: 5, title: "スチーム加熱", detail: "スチームモード100℃。中心温度75℃以上1分間を確認。", duration: "25〜30分", temperature: "100℃ / 中心75℃以上", equipment: "スチームコンベクションオーブン" },
            { step: 6, title: "急速冷却", detail: "ブラストチラーで10℃以下まで冷却。", duration: "40〜60分", temperature: "10℃以下", equipment: "ブラストチラー" },
            { step: 7, title: "スライス・計量・包装", detail: "スライス・計量・真空包装を連続ラインで実施。", duration: "1時間", temperature: "10℃以下", equipment: "スライサー、自動計量機、真空包装機" },
            { step: 8, title: "急速凍結・検査", detail: "急速凍結後、金属探知機を通過。", duration: "3〜4時間", temperature: "−30℃以下", equipment: "急速凍結庫、金属探知機" },
          ],
          qualityPoints: [
            "ブラジル産原料使用時はロット管理を徹底し、トレーサビリティを確保",
            "インジェクション歩留まりを15%以内に管理（過剰注入は食感低下の原因）",
            "中心温度の加熱記録は国産同様に厳守",
            "生姜パウダーの溶解不良（ダマ）がないか目視確認",
          ],
          costEstimate: "原材料費：約180円/200gパック（国産比 約35%コストダウン）",
          tips: [
            "ブラジル産IQFはバラ凍結で解凍効率が良く、作業時間も短縮できる",
            "インジェクション併用でタンブリング時間を10分短縮可能",
            "パウダー類への切り替えで在庫管理・賞味期限管理が楽になる",
            "コスト削減しても加熱・冷却の品質基準は一切変えないこと",
          ],
        },
      },
    ],
  },
  {
    productId: "22",
    variants: [
      {
        condition: "default",
        recipe: {
          productName: "蒸し鶏（よだれ鶏味）",
          batchSize: "100kg仕込み",
          ingredients: [
            { name: "鶏むね肉（国産）", amount: "70kg", note: "皮付き" },
            { name: "食塩", amount: "1.4kg" },
            { name: "生姜（すりおろし）", amount: "0.35kg" },
            { name: "清酒", amount: "1.8L" },
            { name: "水", amount: "12.0L" },
            { name: "【タレ】醤油", amount: "5.0L" },
            { name: "【タレ】ラー油", amount: "1.5L", note: "自家製推奨" },
            { name: "【タレ】花椒（ホール）", amount: "0.3kg", note: "粗挽き" },
            { name: "【タレ】にんにく（すりおろし）", amount: "0.5kg" },
            { name: "【タレ】砂糖", amount: "1.2kg" },
            { name: "【タレ】酢", amount: "1.0L" },
            { name: "【タレ】ごま油", amount: "0.8L" },
          ],
          steps: [
            { step: 1, title: "原料検品・解凍", detail: "鶏むね肉の品温確認。流水解凍で中心温度0〜2℃まで解凍。", duration: "約2時間", temperature: "0〜2℃" },
            { step: 2, title: "ブライン液調合・漬け込み", detail: "水に食塩・生姜・清酒を混合。真空タンブラーで30分漬け込み。", duration: "45分", temperature: "5℃以下", equipment: "真空タンブラー" },
            { step: 3, title: "スチーム加熱", detail: "100℃スチームで中心温度75℃以上1分間を確認。", duration: "25〜30分", temperature: "100℃ / 中心75℃以上", equipment: "スチームコンベクションオーブン" },
            { step: 4, title: "急速冷却", detail: "ブラストチラーで10℃以下まで冷却。", duration: "40〜60分", temperature: "10℃以下", equipment: "ブラストチラー" },
            { step: 5, title: "よだれ鶏タレ調合", detail: "醤油をベースに砂糖を溶解し、酢・にんにく・ごま油を加える。花椒は粗挽きにしてラー油と合わせ、最後に全体を混合。味見をして辛味・酸味のバランスを調整。", duration: "30分", equipment: "調合タンク、ミキサー" },
            { step: 6, title: "スライス・タレ充填", detail: "蒸し鶏を5mm厚にスライスしパックに並べる。タレを小袋（30g/袋）に充填し同梱。", duration: "1時間", temperature: "10℃以下", equipment: "スライサー、液体充填機" },
            { step: 7, title: "真空包装・急速凍結", detail: "真空パック後、急速凍結。金属探知機を通過させる。", duration: "3〜4時間", temperature: "−30℃以下", equipment: "真空包装機、急速凍結庫、金属探知機" },
          ],
          qualityPoints: [
            "タレの辛味レベルを官能検査で毎バッチ確認（基準：辛さ3/5）",
            "花椒は産地によって痺れの強さが異なるため、ロットごとに量を微調整",
            "タレの小袋は密封性を必ず確認（液漏れは重大クレーム要因）",
            "蒸し鶏本体の加熱・冷却基準はプレーンと同一",
          ],
          costEstimate: "原材料費：約350円/200gパック（タレ込み）",
          tips: [
            "自家製ラー油を使うと香りが格段に良くなる。市販品の場合は仕上げにごま油を多めに",
            "花椒は中国産の赤花椒が痺れと香りのバランスが最も良い",
            "タレは冷蔵で1週間持つため、先にまとめて仕込んでおくと効率的",
            "酢の量で味の印象が大きく変わるため、必ず基準量を守ること",
          ],
        },
      },
    ],
  },
  {
    productId: "4",
    variants: [
      {
        condition: "default",
        recipe: {
          productName: "チキン唐揚げ",
          batchSize: "100kg仕込み",
          ingredients: [
            { name: "鶏もも肉（カット済み）", amount: "70kg", note: "25g/30g/40g規格" },
            { name: "醤油", amount: "4.2L", note: "肉重量の6%" },
            { name: "生姜（すりおろし）", amount: "0.7kg", note: "1%" },
            { name: "にんにく（すりおろし）", amount: "0.35kg", note: "0.5%" },
            { name: "清酒", amount: "1.4L", note: "2%" },
            { name: "小麦粉", amount: "6.0kg" },
            { name: "澱粉（片栗粉）", amount: "4.0kg" },
            { name: "食塩", amount: "0.35kg" },
            { name: "胡椒", amount: "0.07kg" },
          ],
          steps: [
            { step: 1, title: "原料カット・検品", detail: "鶏もも肉を規格サイズ（25g/30g/40g）にカット。脂肪・軟骨の除去。重量の抜き取り検査。", duration: "1.5時間", temperature: "5℃以下", equipment: "ダイサー、検品台" },
            { step: 2, title: "下味漬け込み", detail: "醤油・生姜・にんにく・清酒・食塩・胡椒を混合した調味液に鶏肉を投入。真空タンブラーで20分間漬け込み。", duration: "25分", temperature: "5℃以下", equipment: "真空タンブラー" },
            { step: 3, title: "衣付け", detail: "小麦粉と澱粉を6:4の比率で混合。漬け込んだ鶏肉にまんべんなく衣を付ける。付けすぎ注意（衣率25%以内）。", duration: "30分", equipment: "バッターマシン、粉付け機" },
            { step: 4, title: "フライ（パーフライ）", detail: "170℃の油で90秒間パーフライ（半揚げ）。中心温度は55〜60℃程度でOK（最終加熱はお客様側）。表面の衣を固定する目的。", duration: "連続", temperature: "油温170℃", equipment: "連続フライヤー" },
            { step: 5, title: "オイルカット・冷却", detail: "フライ後、振動コンベアで余分な油を切る。室温で粗熱を取った後、予冷コンベアで品温を下げる。", duration: "15分", temperature: "30℃以下", equipment: "振動コンベア、予冷機" },
            { step: 6, title: "急速凍結", detail: "IQF（個別急速凍結）で−18℃以下まで凍結。バラ凍結のため、袋詰め時にくっつかない。", duration: "30〜45分", temperature: "−35℃（庫内）", equipment: "IQFフリーザー" },
            { step: 7, title: "計量・包装・検査", detail: "自動計量機で規定重量を計量し、袋詰め。金属探知機・ウェイトチェッカーを通過。", duration: "連続", equipment: "自動計量機、製袋機、金属探知機" },
          ],
          qualityPoints: [
            "パーフライの油温170℃を厳守（±5℃）。低すぎると油っぽく、高すぎると焦げる",
            "衣率25%以内を維持（衣が多すぎると食感が悪い）",
            "下味の塩分濃度を毎バッチ確認（味ブレ防止）",
            "IQF後のバラけ具合を確認（くっつきはクレーム要因）",
            "揚げ油の酸価（AV）を毎日測定し、3.0以下を管理基準とする",
          ],
          costEstimate: "原材料費：約90円/25g×10個パック",
          tips: [
            "衣の小麦粉:澱粉＝6:4がサクサク感のベストバランス。澱粉を増やすとカリカリ、小麦粉を増やすとしっとり",
            "パーフライ90秒は衣固定の最低ライン。これ以上は加熱しすぎでお客様が揚げた時にパサつく",
            "にんにくは入れすぎると冷凍保存中に臭いが強くなるため0.5%を上限に",
            "夏場はフライ後の冷却速度に注意。粗熱取りの時間が長くなりがち",
          ],
        },
      },
    ],
  },
  {
    productId: "14",
    variants: [
      {
        condition: "default",
        recipe: {
          productName: "ハンバーグ",
          batchSize: "100kg仕込み",
          ingredients: [
            { name: "豚肉（粗挽き）", amount: "35kg" },
            { name: "牛肉（粗挽き）", amount: "25kg" },
            { name: "玉ねぎ（みじん切り・炒め）", amount: "15kg", note: "生重量。炒めると約10kgに" },
            { name: "パン粉", amount: "5kg" },
            { name: "卵", amount: "3kg", note: "約60個" },
            { name: "牛乳", amount: "3L" },
            { name: "食塩", amount: "1.2kg", note: "肉重量の2%" },
            { name: "ナツメグ", amount: "0.06kg" },
            { name: "黒胡椒", amount: "0.06kg" },
          ],
          steps: [
            { step: 1, title: "玉ねぎ炒め・冷却", detail: "みじん切り玉ねぎを大型フライパンで飴色になるまで炒める。炒め後、ブラストチラーで5℃以下まで急速冷却。", duration: "1時間", temperature: "炒め：中火 / 冷却後5℃以下", equipment: "大型フライパン、ブラストチラー" },
            { step: 2, title: "パン粉の牛乳浸し", detail: "パン粉5kgに牛乳3Lを加えてふやかす。しっとりするまで15分放置。", duration: "15分" },
            { step: 3, title: "ミキシング", detail: "粗挽き肉に食塩を加え、粘りが出るまで混ぜる（約3分）。次に冷やした玉ねぎ、ふやかしたパン粉、卵、ナツメグ、胡椒を加えて均一に混合。肉温が10℃を超えないよう注意。", duration: "8〜10分", temperature: "肉温10℃以下", equipment: "真空ミキサー" },
            { step: 4, title: "成形", detail: "80g/100g/120gの規格で成形。自動成形機で均一な形に。中央を少し凹ませると加熱時の膨らみを防げる。", duration: "連続", equipment: "自動成形機" },
            { step: 5, title: "表面焼き（グリル）", detail: "200℃のグリルで片面1分ずつ焼き目をつける。中まで火を通す必要はない（表面のメイラード反応が目的）。", duration: "連続", temperature: "200℃", equipment: "連続グリラー" },
            { step: 6, title: "スチーム加熱", detail: "150℃コンビモードで中心温度75℃以上1分間を確認。ふっくら仕上がる。", duration: "15〜20分", temperature: "150℃コンビ / 中心75℃以上", equipment: "スチームコンベクションオーブン" },
            { step: 7, title: "急速冷却・凍結", detail: "ブラストチラーで10℃以下に冷却後、急速凍結庫で−18℃以下まで凍結。", duration: "4〜5時間", temperature: "−30℃以下", equipment: "ブラストチラー、急速凍結庫" },
            { step: 8, title: "包装・検査", detail: "個包装（トレー＋フィルム）。金属探知機・ウェイトチェッカーを通過。", duration: "連続", equipment: "トレーシーラー、金属探知機" },
          ],
          qualityPoints: [
            "ミキシング時の肉温10℃以下を厳守（脂肪が溶けるとジューシーさが失われる）",
            "玉ねぎは必ず冷却してから合わせる（温かいまま入れると肉温が上がる）",
            "成形時の重量誤差は±3g以内",
            "表面焼きは焼き目の均一性を目視確認",
            "中心温度記録は全バッチ必須",
          ],
          costEstimate: "原材料費：約120円/100gハンバーグ",
          tips: [
            "豚:牛＝6:4が風味とコストのベストバランス。牛を増やすと風味UP、豚を増やすとジューシーさUP",
            "食塩は肉だけに先に加えて練ることで、ミオシンが結着し肉汁を閉じ込める",
            "真空ミキサーを使うと気泡が入らず、滑らかな食感になる",
            "凍結前に必ずソースなしで試食して味のブレを確認すること",
          ],
        },
      },
    ],
  },
  {
    productId: "1",
    variants: [
      {
        condition: "default",
        recipe: {
          productName: "チキンステーキ（プレーン）",
          batchSize: "100kg仕込み",
          ingredients: [
            { name: "鶏もも肉", amount: "85kg", note: "皮付き、均一厚さにスライス" },
            { name: "食塩", amount: "1.7kg", note: "肉重量の2%" },
            { name: "黒胡椒", amount: "0.17kg" },
            { name: "ガーリックパウダー", amount: "0.13kg" },
            { name: "オニオンパウダー", amount: "0.09kg" },
            { name: "調味料（アミノ酸等）", amount: "0.43kg" },
            { name: "水", amount: "12.0L", note: "ブライン液用" },
          ],
          steps: [
            { step: 1, title: "原料下処理", detail: "鶏もも肉の余分な脂肪・軟骨を除去。筋切りを行い加熱時の反りを防止。重量規格（80g/100g/120g）ごとにカット。", duration: "1.5時間", temperature: "5℃以下" },
            { step: 2, title: "ブライン液調合・漬け込み", detail: "水に食塩・香辛料・調味料を溶解。真空タンブラーで25分漬け込み。ピックアップ率12〜15%を目標。", duration: "30分", temperature: "5℃以下", equipment: "真空タンブラー" },
            { step: 3, title: "整形・トレー並べ", detail: "皮目を上にしてトレーに整列。形を整え、見栄えの良い状態にする。", duration: "30分" },
            { step: 4, title: "急速凍結", detail: "生のまま急速凍結。中心温度−18℃以下を確認。", duration: "3〜4時間", temperature: "−30℃以下", equipment: "急速凍結庫" },
            { step: 5, title: "包装・検査", detail: "個包装し、金属探知機・ウェイトチェッカーを通過。ラベル貼付。", duration: "連続", equipment: "包装機、金属探知機" },
          ],
          qualityPoints: [
            "筋切りの深さは肉厚の1/3程度。深すぎると肉が崩れる",
            "タンブリングのピックアップ率12〜15%で味のバランスと歩留まりを両立",
            "凍結前の重量検品で規格誤差±5g以内を確認",
          ],
          costEstimate: "原材料費：約150円/100gパック",
          tips: [
            "筋切りは格子状に行うと最も効果的。焼いた時に均一に火が通る",
            "この商品は生凍結（パーフライなし）。お客様が焼くため、加熱工程は不要",
            "皮目の焼き上がりを美しくするため、皮面はきれいに伸ばして凍結すること",
          ],
        },
      },
    ],
  },
];

// Generic recipe generation for products without specific templates
function generateGenericRecipe(product: Product, condition: string): RecipeProposal {
  const isChicken = product.category === "鶏肉加工品";
  const isPork = product.category === "豚肉加工品";
  const isSeafood = product.category === "水産加工品";
  const isVegetable = product.category === "野菜加工品";
  const isFried = product.features.some(f => f.includes("衣") || f.includes("揚げ"));

  const baseSteps: RecipeStep[] = [
    { step: 1, title: "原料検品・下処理", detail: `${product.ingredients.split("、")[0]}の品温確認、解凍、トリミング。規格ごとにカット・計量。`, duration: "1〜2時間", temperature: "5℃以下" },
    { step: 2, title: "調味・漬け込み", detail: `調味液（${product.ingredients.split("、").slice(1, 4).join("、")}等）を調合し、真空タンブラーで漬け込み。`, duration: "20〜30分", temperature: "5℃以下", equipment: "真空タンブラー" },
  ];

  if (isFried) {
    baseSteps.push(
      { step: 3, title: "衣付け", detail: "バッター液を通し、パン粉を付ける。衣率20〜25%を管理。", duration: "連続", equipment: "バッターマシン、ブレッダー" },
      { step: 4, title: "パーフライ", detail: "170℃の油で60〜90秒パーフライ。衣を固定する。", duration: "連続", temperature: "170℃", equipment: "連続フライヤー" },
      { step: 5, title: "冷却・凍結", detail: "オイルカット後、IQF凍結で−18℃以下まで凍結。", duration: "1〜2時間", temperature: "−35℃", equipment: "IQFフリーザー" },
      { step: 6, title: "包装・検査", detail: "計量・袋詰め・金属探知機通過。", duration: "連続", equipment: "自動計量機、金属探知機" },
    );
  } else {
    baseSteps.push(
      { step: 3, title: "加熱処理", detail: "スチームコンベクションオーブンで中心温度75℃以上1分間を確保。", duration: "20〜30分", temperature: "中心75℃以上", equipment: "スチームコンベクションオーブン" },
      { step: 4, title: "急速冷却", detail: "ブラストチラーで10℃以下まで冷却。", duration: "40〜60分", temperature: "10℃以下", equipment: "ブラストチラー" },
      { step: 5, title: "包装・急速凍結", detail: "真空包装後、急速凍結庫で−18℃以下まで凍結。", duration: "3〜4時間", temperature: "−30℃以下", equipment: "真空包装機、急速凍結庫" },
      { step: 6, title: "検査・出荷準備", detail: "金属探知機・ウェイトチェッカー通過。ラベル貼付。", duration: "連続", equipment: "金属探知機" },
    );
  }

  return {
    productName: product.name,
    batchSize: "100kg仕込み（目安）",
    ingredients: product.ingredients.split("、").map((ing, i) => ({
      name: ing.trim(),
      amount: i === 0 ? "主原料 60〜80kg" : "適量（配合設計により調整）",
    })),
    steps: baseSteps,
    qualityPoints: [
      "中心温度管理（加熱75℃以上1分間 / 冷却30分以内に10℃以下）を厳守",
      "原料のトレーサビリティを確保（ロット番号・産地の記録）",
      "金属探知機を全数通過させること",
      isFried ? "揚げ油の酸価（AV）を毎日測定し3.0以下を管理" : "包装の密封性を確認",
    ],
    costEstimate: "※ 原材料相場により変動。詳細は原価管理部門にお問い合わせください",
    tips: [
      "本レシピはAIによる汎用提案です。実際の製造は品質管理部門と配合を確定させてください",
      `${product.category}の一般的な製造工程をベースにしています`,
      condition !== "default" ? `ご指定の「${condition}」条件を考慮した提案です` : "標準的な配合でのご提案です",
    ],
  };
}

export function getRecipeProposal(productId: string, condition: string = "default"): RecipeProposal | null {
  const product = getProductById(productId);
  if (!product) return null;

  const template = recipeTemplates.find(t => t.productId === productId);
  if (template) {
    const variant = template.variants.find(v => v.condition === condition)
      || template.variants.find(v => v.condition === "default");
    if (variant) return variant.recipe;
  }

  return generateGenericRecipe(product, condition);
}

export function getAvailableConditions(productId: string): string[] {
  const template = recipeTemplates.find(t => t.productId === productId);
  if (!template) return ["default"];
  return template.variants.map(v => v.condition);
}
