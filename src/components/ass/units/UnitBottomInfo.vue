<script setup>
import githubIcon from '../../../assets/img/Icon_Github_Dark.png'
import youtubeIcon from '../../../assets/img/Icon_Youtube_Dark.png'
import blogIcon from '../../../assets/img/Icon_Blog_Dark.png'
import instaIcon from '../../../assets/img/Icon_Insta_Dark.png'

// TODO: url은 임시로 naver.com - 실제 계정 주소로 교체 필요
const socialLinks = [
  { name: 'GitHub', icon: githubIcon, url: 'https://github.com/JHuiJung' },
  { name: 'YouTube', icon: youtubeIcon, url: 'https://www.youtube.com/@jhj_baobab' },
  { name: 'Blog', icon: blogIcon, url: 'https://jhjbaobab.tistory.com/' },
  { name: 'Instagram', icon: instaIcon, url: 'https://www.instagram.com/jhj_baobab/' },
]
</script>
<template>

  <div class="bottom-info">
    <p class="bread-font">✉️ wjdgmlwnd12@gmail.com</p>
    <div class="social-links">
      <a
        v-for="link in socialLinks"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
      >
        <img :src="link.icon" :alt="link.name" />
      </a>
    </div>
  </div>
</template>

<style>
.bottom-info{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bread-fill-color);
  background-image: linear-gradient(rgba(253, 241, 214, 0.95), rgba(253, 241, 214, 0.9)),
    url('../../../assets/img/img_Bread_Texture.png');
  background-size: cover;
  background-position: center;
  border-radius: 25px 25px 0px 0px;
  width: 100%;
  max-width: 1200px;
  /* 위쪽 auto margin이 flex 컬럼에서 남는 공간을 다 먹어서 콘텐츠가 적을 때도 바닥에 붙음 */
  margin: auto auto 0 auto;
  border-top: 10px solid var(--bread-border-color);
  border-left: 10px solid var(--bread-border-color);
  border-right: 10px solid var(--bread-border-color);
  border-bottom: none;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 10px 10px var(--bread-border-color);
}

.social-links {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 16px;
}

.social-link img {
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  transition: transform 0.2s ease;
}

.social-link:hover img {
  transform: scale(1.15);
}
</style>
