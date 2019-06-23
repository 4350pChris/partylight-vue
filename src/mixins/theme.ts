import { Component, Inject, Vue } from 'vue-property-decorator';

@Component
export default class ThemeMixin extends Vue {
  @Inject()
  theme!: { isDark: boolean };
}
