# from rest_framework.fields import SerializerMethodField
#
# from .models import Category, Course, Lesson, Tag, Comment, User
# from rest_framework import serializers
#
#
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         exclude = ['active']
#
#
# class CourseSerializer(serializers.ModelSerializer):
#     image = serializers.SerializerMethodField(source='image')
#
#     def get_image(self, obj):
#         request = self.context['request']
#         if obj.image and not obj.image.name.startswith('/static'):
#             path = '/static/%s' % obj.image.name
#
#             return request.build_absolute_uri(path)
#
#     class Meta:
#         model = Course
#         fields = ['id', 'subject', 'image', 'created_date', 'category_id']
#
#
# class TagSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Tag
#         fields = ['id', 'name']
#
#
# class LessonSerializer(serializers.ModelSerializer):
#     image = serializers.SerializerMethodField(source='image')
#     tags = TagSerializer(many=True)
#
#     class Meta:
#         model = Lesson
#         fields = ['id', 'subject', 'image', 'created_date', 'updated_date', 'course_id', 'tags']
#
#     def get_image(self, obj):
#         request = self.context['request']
#         if obj.image and not obj.image.name.startswith('/static'):
#             path = '/static/%s' % obj.image.name
#
#             return request.build_absolute_uri(path)
#
#
#
#
# # class LessonDetailSerializer(LessonSerializer):
# #     like = serializers.SerializerMethodField()
# #     rating = serializers.SerializerMethodField()
# #     def get_like(self, lesson):
# #         request = self.context.get('request')
# #         if request:
# #             return lesson.like_set.filter(user=request.user, active=True).exists()
# #     def get_rating(self, lesson):
# #         request = self.context.get('request')
# #         if request:
# #             r = lesson.rating_set.filter(user=request.user).first()
# #             if r:
# #                 return r.rate
# #     class Meta:
# #         # model = Lesson
# #         # fields = ['id', 'subject', 'image', 'created_date', 'updated_date', 'course_id', 'tags', 'content', 'like']
# #         model = LessonSerializer.Meta.model
# #         fields = LessonSerializer.Meta.fields + ['content', 'like', 'rating']
#
#
# class LessonDetailSerializer(LessonSerializer):
#
#
#     class Meta:
#         model = LessonSerializer.Meta.model
#         fields = LessonSerializer.Meta.fields + ['content']
#
# class AuthLessonDetailSerializer(LessonDetailSerializer):
#     like = serializers.SerializerMethodField()
#     rating = serializers.SerializerMethodField()
#
#     def get_like(self, lesson):
#         request = self.context.get('request')
#         if request:
#             return lesson.like_set.filter(user=request.user, active=True).exists()
#
#     def get_rating(self, lesson):
#         request = self.context.get('request')
#         if request:
#             r = lesson.rating_set.filter(user=request.user).first()
#             if r:
#                 return r.rate
#
#     class Meta:
#         model = Lesson
#         fields = LessonDetailSerializer.Meta.fields + ['like', 'rating']
#
# class UserSerializer(serializers.ModelSerializer):
#     avatar = serializers.SerializerMethodField(source='avatar')
#
#     def get_avatar(self, obj):
#         request = self.context["request"]
#         if obj.avatar and not obj.avatar.name.startswith("/static"):
#
#             path = '/static/%s' % obj.avatar.name
#
#             return request.build_absolute_uri(path)

#     class Meta:
#         model = User
#         fields = ['id', 'first_name', 'last_name',
#                   'username', 'password', 'email',
#                   'avatar']
#         extra_kwargs = {
#             'password': {
#                 'write_only': True
#             }
#         }
#
#     def create(self, validated_data):
#         data = validated_data.copy()
#         user = User(**data)
#         user.set_password(user.password)
#         user.save()
#
#         return user
#
#
# class CreateCommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ['content', 'lesson', 'user']
#
#
# class CommentSerializer(serializers.ModelSerializer):
#     user = UserSerializer()
#
#     class Meta:
#         model = Comment
#         fields = ['id', 'content', 'created_date', 'updated_date', 'user']
from rest_framework import serializers
from .models import Category, Course, Lesson, Tag, Comment, User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, obj):
        request = self.context['request']
        # if obj.image and obj.image.name.startswith("/static"):
        #     pass
        # else:
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Course
        fields = ['id', 'subject', 'created_date', 'image', 'category_id']


class TagSeriazlier(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class LessonSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    tags = TagSeriazlier(many=True)

    def get_image(self, obj):
        request = self.context['request']
        # if obj.image and obj.image.name.startswith("/static"):
        #     pass
        # else:
        path = '/static/%s' % obj.image.name

        return request.build_absolute_uri(path)

    class Meta:
        model = Lesson
        fields = ['id', 'subject', 'created_date', 'updated_date', 'course_id', 'image', 'tags']


class LessonDetailSerializer(LessonSerializer):
    class Meta:
        model = Lesson
        fields = LessonSerializer.Meta.fields + ['content']


class AuthLessonDetailSerializer(LessonDetailSerializer):
    like = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    def get_like(self, lesson):
        request = self.context.get('request')
        if request:
            return lesson.like_set.filter(user=request.user, active=True).exists()

    def get_rating(self, lesson):
        request = self.context.get('request')
        if request:
            r = lesson.rating_set.filter(user=request.user).first()
            if r:
                return r.rate

    class Meta:
        model = Lesson
        fields = LessonDetailSerializer.Meta.fields + ['like', 'rating']


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(source='avatar')

    def get_avatar(self, obj):
        request = 'http://127.0.0.1:8000'
        if obj.avatar and not obj.avatar.name.startswith("/static"):

            path = '/static/%s' % obj.avatar.name

            return request + path
        path = '/%s' % obj.avatar.name
        return request + path

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'username', 'password', 'email',
                  'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(user.password)
        user.save()

        return user


class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'user', 'lesson']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        exclude = ['active']
